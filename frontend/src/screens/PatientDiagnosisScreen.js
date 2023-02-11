import React, { useState } from 'react'
import Container from '../components/Container'
import ScrollArea from 'react-scrollbar'
import bellwhite from '../images/bellwhite.png'
import PatientNotes from '../components/PatientNotes'
import diagnose1 from '../images/diagnose1.png'
import diagnose2 from '../images/diagnose2.png'

import { useLocation, useHistory } from 'react-router-dom'
import { doc, getDoc, collection, query, where, getFirestore, getDocs } from "firebase/firestore";

const db = getFirestore();

function PatientDiagnosisScreen() {
    const [patient, setPatient] = useState(undefined);
    const loc = useLocation()
    const history = useHistory()
    const diagnosis = loc.pathname.split("/")[4].split("-")

    if (patient === undefined) {
        (async () => {
            const docRef = doc(db, "users", loc.pathname.split("/")[2], "patients", loc.pathname.split("/")[3]);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPatient(docSnap.data())
            } else {
                console.log("No such document!");
            }
        })();
    }
    if (patient !== undefined) {

        return (
            <Container>
                <div className="absolute w-full h-full bg-headinggreen z-10"></div>
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
                                <div className="">

                                    <div className="flex flex-row justify-center items-center pl-4 mt-4 w-full  text-white ">
                                        <button onClick={() => history.goBack()} className="pr-6"><i className="fas fa-chevron-left text-4xl  "></i></button>

                                        <div className="flex flex-col flex-1 justify-center items-start">
                                            <h1 className=" font-semibold " style={{ fontSize: '32px' }}>Patient notes</h1>

                                        </div>
                                        <div className=" pr-3">
                                            <img src={bellwhite} alt="" className="" />
                                        </div>
                                    </div>



                                    <div className="flex flex-row pl-4 items-center w-full my-5 text-white font-lato ">

                                        <div className=" bg-gray-100 w-20 h-20 rounded-full flex justify-center items-center mr-8">
                                            <i className="far fa-user text-3xl text-headinggreen"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className=" font-medium  " style={{ fontSize: '26px' }}>{patient.name}</h1>
                                            <p className="text-xl ">Room {patient.room_number}</p>
                                        </div>


                                    </div>

                                    {/*Patient notes info (age, heartbeat,) */}
                                    <div className="bg-bggreen">
                                        <PatientNotes bgDimmedColor="true" textColor="text-headinggreen" bgColor="green" green="true" patient={patient} symptoms={patient.symptoms} />


                                        <div className="flex flex-col justify-items-start items-start px-4 bg-white py-4 rounded-3xl space-y-2 mt-8">

                                            <h1 className="text-headingblue text-3xl font-semibold font-lato">Possible Diagnosis</h1>
                                            {Array.from(new Set(diagnosis)).map((d) => {
                                                return (
                                                    <p className="py-2 px-10  text-white rounded-3xl bg-headingblue w-full  text-lg">{d}</p>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </ScrollArea>

                    </div >
                </div >
            </Container >
        )
    } else {
        return (<> </>)
    }
}

export default PatientDiagnosisScreen
