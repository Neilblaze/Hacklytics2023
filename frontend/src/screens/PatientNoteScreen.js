import React, { useState } from 'react'
import Container from '../components/Container'
import ScrollArea from 'react-scrollbar'
import bellwhite from '../images/bellwhite.png'
import { useHistory, useLocation } from 'react-router-dom'
import { create } from 'ipfs-http-client'
import PatientNotes from '../components/PatientNotes'
import SpeechToText from '../components/SpeechToText'
import axios from 'axios'

import { doc, getDoc, collection, query, where, getFirestore, getDocs, setDoc } from "firebase/firestore";

const db = getFirestore();

// Symptoms list - source: https://www.kaggle.com/itachi9604/disease-symptom-description-dataset
// parsed with parser.py
const symptoms_list = ['itching', 'skin rash', 'nodal skin eruptions', 'continuous sneezing', 'shivering', 'chills', 'joint pain', 'stomach pain', 'acidity', 'ulcers on tongue', 'muscle wasting', 'vomiting', 'burning micturition', 'spotting urination', 'fatigue', 'weight gain', 'anxiety', 'cold hands and feets', 'mood swings', 'weight loss', 'restlessness', 'lethargy', 'patches in throat', 'irregular sugar level', 'cough', 'high fever', 'sunken eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish skin', 'dark urine', 'nausea', 'loss of appetite', 'pain behind the eyes', 'back pain', 'constipation', 'abdominal pain', 'diarrhoea', 'mild fever', 'yellow urine', 'yellowing of eyes', 'acute liver failure', 'fluid overload', 'swelling of stomach', 'swelled lymph nodes', 'malaise', 'blurred and distorted vision', 'phlegm', 'throat irritation', 'redness of eyes', 'sinus pressure', 'runny nose', 'congestion', 'chest pain', 'weakness in limbs', 'fast heart rate', 'pain during bowel movements', 'pain in anal region', 'bloody stool', 'irritation in anus', 'neck pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen legs', 'swollen blood vessels', 'puffy face and eyes', 'enlarged thyroid', 'brittle nails', 'swollen extremeties', 'excessive hunger', 'extra marital contacts', 'drying and tingling lips', 'slurred speech', 'knee pain', 'hip joint pain', 'muscle weakness', 'stiff neck', 'swelling joints', 'movement stiffness', 'spinning movements', 'loss of balance', 'unsteadiness', 'weakness of one body side', 'loss of smell', 'bladder discomfort', 'foul smell ofurine', 'continuous feel of urine', 'passage of gases', 'internal itching', 'toxic look (typhos)', 'depression', 'irritability', 'muscle pain', 'altered sensorium', 'red spots over body', 'belly pain', 'abnormal menstruation', 'dischromic patches', 'watering from eyes', 'increased appetite', 'polyuria', 'family history', 'mucoid sputum', 'rusty sputum', 'lack of concentration', 'visual disturbances', 'receiving blood transfusion', 'receiving unsterile injections', 'coma', 'stomach bleeding', 'distention of abdomen', 'history of alcohol consumption', 'fluid overload', 'blood in sputum', 'prominent veins on calf', 'palpitations', 'painful walking', 'pus filled pimples', 'blackheads', 'scurring', 'skin peeling', 'silver like dusting', 'small dents in nails', 'inflammatory nails', 'blister', 'red sore around nose', 'yellow crust ooze', 'prognosis']

function PatientNoteScreen(props) {
    const [patient, setPatient] = useState(undefined);
    const [symptoms, setSymptoms] = useState(patient === undefined ? ['No symptoms'] : patient.symptoms);
    const [note, setNote] = useState([]);
    const loc = useLocation()
    const history = useHistory()

    if (patient === undefined) {
        (async () => {
            const docRef = doc(db, "users", loc.pathname.split("/")[2], "patients", loc.pathname.split("/")[3]);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPatient(docSnap.data())
                setSymptoms(docSnap.data().symptoms)
            } else {
                console.log("No such document!");
            }
        })();
    }

    const handleNoteChange = (note) => {
        if (!(note.includes(" "))) {
            return;
        }

        // one word symptom
        let noteArr = note.split(" ");
        for (let word of noteArr) {
            if (symptoms_list.indexOf(word.toLowerCase()) !== -1 && symptoms.indexOf(word.toLowerCase()) === -1) {
                setSymptoms([...symptoms, word])
            }
        }
        // two words symptom
        noteArr = note.match(/\b[\w']+(?:[^\w\n]+[\w']+){0,1}\b/g);
        if (noteArr.length === 0) {
            return
        }
        for (let word of noteArr) {
            if (symptoms_list.indexOf(word.toLowerCase()) !== -1 && symptoms.indexOf(word.toLowerCase()) === -1) {
                setSymptoms([...symptoms, word])
            }
        }

        console.log(symptoms);
        const ref = doc(db, 'users', loc.pathname.split("/")[2], 'patients', loc.pathname.split("/")[3]);
        setDoc(ref, { symptoms: symptoms }, { merge: true });
    }

    const getPredictionLink = (symptoms) => {
        let symptoms_underscored = []
        symptoms.forEach(
            (element) => symptoms_underscored.push(element.split(" ").join("_"))
        );

        const symptoms_length = symptoms_underscored.length;
        let new_length = 0;
        let onlyFiveSymptoms = [];
        let api_get_link = "";

        if (symptoms_length < 5 && symptoms_length > 0) {
            while (new_length < 5) {
                onlyFiveSymptoms.push(...symptoms_underscored);
                new_length = onlyFiveSymptoms.length;
            }
        } else if ((symptoms_length > 0) && (symptoms_length > 5)) {
            onlyFiveSymptoms = symptoms_underscored.slice(0, 5);
        } else if (symptoms_length === 5) {
            onlyFiveSymptoms = symptoms_underscored;
        }
        console.log(onlyFiveSymptoms);

        for (let i = 0; i < 5; i++) {
            onlyFiveSymptoms = onlyFiveSymptoms.slice(0, 5);
            let symptom_order = onlyFiveSymptoms[i];
            switch (i) {
                case 0:
                    api_get_link =
                        "INPUT API KEY HERE" + // Removed API endpoint for security reasons
                        symptom_order;

                    break;
                case 1:
                    api_get_link = api_get_link + "&s2=" + symptom_order;
                    break;
                case 2:
                    api_get_link = api_get_link + "&s3=" + symptom_order;
                    break;
                case 3:
                    api_get_link = api_get_link + "&s4=" + symptom_order;
                    break;
                case 4:
                    api_get_link = api_get_link + "&s5=" + symptom_order;
                    break;
            }
        }
        return {
            api_get_link
        }
    };

    const ipfsHandler = async () => {
        const client = create('https://ipfs.infura.io:5001')
        const { cid } = await client.add(symptoms)
        console.log(cid._baseCache)
    }

    const handlePrediction = (e) => {

        ipfsHandler()



        e.preventDefault()
        let test = getPredictionLink(symptoms);
        axios.get('https://cors-anywhere.herokuapp.com/' + test.api_get_link, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'origin': 'localhost'
            }
        })
            .then(function (response) {
                // handle success
                let predicted_diseases = Object.values(response.data)

                let predicted_diseases_underscored = []
                predicted_diseases.forEach(
                    (element) => predicted_diseases_underscored.push(element.split(" ").join("_"))
                );
                let prediction = predicted_diseases_underscored.join('-')

                history.push(`/patient-predict-diagnosis/${loc.pathname.split("/")[2]}/${loc.pathname.split("/")[3]}/${prediction}`)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    if (patient !== undefined) {
        return (
            <Container>
                <div className="absolute w-full h-full bg-headingblue z-10"></div>
                <div className="content absolute top-0 left-0 w-full h-full z-30 font-lato ">
                    <div className=" mt-16 flex flex-col justify-center items-center ">
                        <ScrollArea speed={0.4}
                            className="roun rounded-3xl"
                            contentClassName="content"
                            style={{ height: '804px', width: '402px' }}
                            horizontal={false}
                            vertical={true}
                        >
                            <div className="">
                                <div className="   ">

                                    <button onClick={() => history.goBack()} className="flex flex-row justify-center items-center pl-4 mt-4 w-full  text-white ">
                                        <div className="pr-6"><i className="fas fa-chevron-left text-4xl  "></i></div>

                                        <div className="flex flex-col flex-1 justify-center items-start">
                                            <h1 className=" font-semibold " style={{ fontSize: '32px' }}>Patient notes</h1>

                                        </div>
                                        <div className=" pr-3">
                                            <img src={bellwhite} alt="" className="" />
                                        </div>
                                    </button>



                                    <div className="flex flex-row pl-4 items-center w-full my-5 text-white font-lato ">

                                        <div className=" bg-gray-100 w-20 h-20 rounded-full flex justify-center items-center mr-8">
                                            <i className="far fa-user text-3xl text-headingblue"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className=" font-medium  " style={{ fontSize: '26px' }}>{patient.name}</h1>
                                            <p className="text-xl ">Room {patient.room_number}</p>
                                        </div>


                                    </div>


                                    {/*Patient notes info (age, heartbeat,) */}
                                    <PatientNotes symptoms={symptoms} patient={patient} />


                                    {/*Inputing/adding  Notes */}
                                    <div className="bg-bggray">

                                        <SpeechToText note={note} setNote={setNote} doctorId={loc.pathname.split("/")[2]} patientId={loc.pathname.split("/")[3]} handleNoteChange={handleNoteChange} handleDiagnosis={handlePrediction} />
                                    </div>


                                </div>
                            </div>
                        </ScrollArea>

                    </div >
                </div >
            </Container >
        )
    } else {
        return (
            <> </>
        )
    }
}

export default PatientNoteScreen
