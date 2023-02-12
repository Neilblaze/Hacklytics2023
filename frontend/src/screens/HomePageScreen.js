import React, { useState, useEffect } from 'react'
import Container from '../components/Container'
import diagnose1 from '../images/diagnose1.png'
// import heart from '../images/heart.png'

import notes from '../images/notesadd.png'
import profilepic from '../images/profilepic.png'
import bell from '../images/bell.png'
import SearchPanel from '../components/SearchPanel'
import PatientsList from '../components/PatientsList'
import { useLocation, useHistory } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getFirestore, getDocs } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

function HomePageScreen() {
    const loc = useLocation();
    const [doctorName, setDoctorName] = useState("")
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const docRef = doc(db, "users", loc.pathname.split("/")[2]);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDoctorName(docSnap.data().name)
            } else {
                console.log("No such document!");
            }
        })();
    }, [doctorName, loc]);

    return (
        <Container>


            {/* <div className="absolute w-full h-full bg-pgray z-10"></div> */}

            <div className="card-bg w-full h-full z-30">

                <div className="w-full px-12 mt-16 flex flex-col justify-center items-center ">
                   
                        <div className="">
                            <div className="   ">

                                <div className="flex flex-row justify-center items-start pl-4 mt-2">
                                    <div className="pr-4">
                                        <img src={profilepic} alt="" />

                                    </div>

                                    <div className="flex flex-col flex-1 justify-center items-start">
                                        <h1 className="text-2xl font-semibold text-gray-300">Hi, Dr. {doctorName}!</h1>
                                        <p className="text-lg text-gray-400">Let's look at your patients</p>
                                    </div>
                                    <div className="">
                                        <img src={bell} alt="" className="" />
                                    </div>
                                </div>

                                <SearchPanel />


                                <div className="flex flex-col space-y-4 my-8">
                                    <h1 className="text-2xl font-semibold text-gray-400">Services</h1>


                                    <button onClick={() => history.push("/patients-notes/" + loc.pathname.split("/")[2])} className="flex flex-row justify-center items-center w-full h-20  px-4  rounded-xl" style={{ backgroundColor: '#C4C9E4' }}>
                                        <div className="rounded-full flex flex-row justify-center items-center">
                                            <img src={notes} alt="" className="w-12" />
                                        </div>
                                        <h1 className="flex-1 ml-4 text-xl">Notes</h1>
                                        <i className="fas fa-chevron-right text-3xl "></i>
                                    </button>


                                    <button onClick={() => history.push("/patients-diagnose/" + loc.pathname.split("/")[2])} className="flex flex-row justify-center items-center w-full h-20 text-headinggreen px-4  rounded-xl" style={{ backgroundColor: '#9ED4DC' }}>
                                        <div className="rounded-full flex flex-row justify-center items-center ">
                                            <img src={diagnose1} alt="" className="w-12 ml-3" />
                                        </div>
                                        <h1 className="flex-1 ml-4 text-xl">Diagnose</h1>
                                        <i className="fas fa-chevron-right text-3xl "></i>
                                    </button>

                                    <button onClick={() => history.push("/heartbeat/")} className="flex flex-row justify-center items-center w-full h-20 text-red-600 px-4 bg-red-300 rounded-xl">
                                        <div className="rounded-full flex flex-row justify-center items-center ">
                                            <img src="https://img.icons8.com/color/96/null/heart-rainbow.png" alt="" className="w-12 ml-3" />
                                        </div>
                                        <h1 className="flex-1 ml-4 text-xl">Measure Heartbeat</h1>
                                        <i className="fas fa-chevron-right text-3xl "></i>
                                    </button>


                                </div>

                                {/* Search panel with filter icon */}


                                {/* Patients list */}
                                <PatientsList doctorId={loc.pathname.split("/")[2]} />
                                <button className="bg-blue-700 text-xl text-white rounded-xl p-4 w-full mt-4" onClick={() => { signOut(auth); history.push('/login') }}>Sign Out</button>
                            </div>

                        </div>

                </div>
            </div>
        </Container>
    )
}

export default HomePageScreen
