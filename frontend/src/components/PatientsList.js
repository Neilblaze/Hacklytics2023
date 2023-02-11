import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { doc, getDoc, collection, query, where, getFirestore, getDocs } from "firebase/firestore";

const db = getFirestore();
function PatientsList(props) {
    const history = useHistory();

    const [patientList, setPatientList] = useState(undefined)

    if (patientList === undefined){
        const tempPatientList = []
        const q = query(collection(db, "users", props.doctorId, "patients"));
        console.log(q)
        getDocs(q).then((querySnapshot) => {
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                tempPatientList.push({...doc.data(), id: doc.id})
            });
            setPatientList(tempPatientList);
        })
    }

    return (
        <div className="flex flex-col justify-start pl-5 rounded-2xl bg-white mt-4">
            <div className="flex place-items-center item-center justify-between mt-4 mr-4">
                <h1 className="font-semibold text-2xl text-headingblue">Patients</h1>
                <button onClick={() => history.push(`/patient/add/${props.doctorId}`)} class="text-gray-800 font-bold py-2 px-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                </button>
            </div>

            <div className="patientsListWrapper ">
                {patientList !== undefined && patientList.map(patient => {
                    return(
                    <button onClick={() => history.push('/patient/' + props.doctorId + "/" + patient.id)}  className="flex flex-row justify-between items-center w-full my-5 text-headingblue font-poppins">

                    <div className=" bg-gray-100 w-14 h-14 rounded-full flex justify-center items-center ">
                        <i className="far fa-user text-lg"></i>
                    </div>
                    <div className="flex flex-col w-6/12">
                        <h1 className="text-xl  font-medium  ">{patient.name}</h1>
                        <p className="text-base">Room {patient.room_number}</p>
                    </div>
                    <i className="fas fa-chevron-right text-3xl pr-8"></i>

                </button>
                    )
                })}
            </div>
        </div>
    )
}

export default PatientsList
