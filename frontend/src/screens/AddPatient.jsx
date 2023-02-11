import React from 'react'
import Container from '../components/Container'
import ScrollArea from 'react-scrollbar'
import bell from '../images/bell.png'
import {useHistory, useLocation} from 'react-router-dom';
import { getFirestore, collection, addDoc } from "firebase/firestore";

var db = getFirestore();

function AddPatient(props) {
    console.log("here")
    const history = useHistory()
    const location = useLocation();

    const savePatientToDB = async (e) => {
        e.preventDefault();
        const { name, age, gender, height, weight, heartbeat, hg_count, symptoms, medical_history, room_number } = e.target.elements;
        console.log(name, age, gender, height, weight, heartbeat, hg_count, symptoms, medical_history, room_number)
        try {
            const docRef = await addDoc(collection(db, "users", location.pathname.split("/")[3], "patients"), {
                name: name.value,
                age: age.value,
                gender: gender.value,
                height: height.value, 
                weight: weight.value, 
                heartbeat: heartbeat.value, 
                hg_count: hg_count.value, 
                symptoms: symptoms.value.split(","), 
                medical_history: medical_history.value.split(","), 
                room_number: room_number.value
            });
            console.log("Document written with ID: ", docRef.id);
            history.goBack()
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    
    return (
        <Container>
            <div className="absolute w-full h-full bg-bggray z-10"></div>

            <div className="content absolute top-0 left-0 w-full h-full z-30 font-lato ">

                <div className="w-full px-12 mt-16 flex flex-col justify-center items-center ">
                    <ScrollArea speed={0.4}
                        className="w-full"
                        contentClassName="content"
                        style={{ height: '780px' }}
                        horizontal={false}
                        vertical={true}
                    >
                        <div className="">
                            <div className="   ">

                                <div className="flex flex-row justify-center items-start pl-4 mt-2 text-headingblue">
                                    <button onClick={() => history.goBack()} className="pr-4"><i className="fas fa-chevron-left text-4xl \ "></i></button>

                                <div className="flex flex-col flex-1 justify-center items-start">
                                        <h1 className="text-3xl font-semibold \">Add patients</h1>
                                        <p className="text-lg \">Enter Patient Details</p>
                                    </div>
                                    <div className="">
                                        <img src={bell} alt="" className="" />
                                    </div>
                                </div>
                                <form className="mt-8 flex flex-col justify-center place-items-center" onSubmit={savePatientToDB}>
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="text" name="name" id="" placeholder="Patient name" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="number" name="age" id="" placeholder="Age" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="text" name="gender" id="" placeholder="Gender" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="number" name="height" id="" placeholder="Height" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="number" name="weight" id="" placeholder="Weight" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="number" name="heartbeat" id="" placeholder="Heartbeat" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="text" name="hg_count" id="" placeholder="Heamoglobin count" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="text" name="symptoms" id="" placeholder="Symptoms" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="text" name="medical_history" id="" placeholder="Medical History" />
                                    <input className="w-full mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white" type="text" name="room_number" id="" placeholder="Room number" />
                                    <button type="submit"  className="bg-blue-700 text-2xl text-white rounded-xl p-4 w-3/4">Add Patient</button>
                                </form>

                            </div>

                        </div>

                    </ScrollArea>

                </div>
            </div>
        </Container>
    )
}

export default AddPatient;
