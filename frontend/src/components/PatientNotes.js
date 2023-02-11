import React from 'react'

import age from '../images/age.png'
import height from '../images/height.png'
import weight from '../images/weight.png'
import heartbeat from '../images/heartbeat.png'
import blood from '../images/blood.png'
import sex from '../images/sex.png'

import agegreen from '../images/agegreen.png'
import heightgreen from '../images/heightgreen.png'
import weightgreen from '../images/weightgreen.png'
import heartbeatgreen from '../images/heartbeatgreen.png'
import bloodgreen from '../images/bloodgreen.png'
import sexgreen from '../images/sexgreen.png'

import plus from '../images/plus.png'
import { useHistory } from 'react-router-dom';

function PatientNotes(props) {
    const history = useHistory();
    return (
        <div className={` ${props.bgDimmedColor ? 'bg-bggreen' : 'bg-pgray'} rounded-t-3xl px-4 ${props.textColor ? props.textColor : 'text-headingblue'}  font-poppins`}>
            <h1 className="text-xl font-semibold pt-8 pb-4">Patient Notes</h1>


            {/* Patient details - hearbeat, age, weight, blood, etc.*/}
            <div className="flex flex-col items-start justify-center font-poppins">


                <div className="flex flex-row w-full px-4">
                    <div className="flex flex-1 flex-row justify-items-start items-center  text-lg ">
                        {props.bgColor ?
                            <img src={agegreen} alt="" className="pr-4 w-12 " /> :
                            <img src={age} alt="" className="pr-4 w-12 " />

                        }

                        <p className=" text-xl ">{props.patient.age} y.o</p>
                    </div>

                    <div className="flex flex-1 flex-row justify-items-start items-center  ">
                        {props.bgColor ?
                            <img src={sexgreen} alt="" className="pr-4 w-12 " /> :
                            <img src={sex} alt="" className="pr-4 w-12 " />

                        }
                        <p className=" text-xl ">{props.patient.gender}</p>
                    </div>
                </div>



                <div className="flex flex-row w-full px-4">
                    <div className="flex flex-1 flex-row justify-items-start items-center  text-lg ">
                        {props.bgColor ?
                            <img src={weightgreen} alt="" className="pr-4 w-12 " /> :
                            <img src={weight} alt="" className="pr-4 w-12 " />

                        }
                        <p className=" text-xl ">{props.patient.weight} kilos</p>
                    </div>

                    <div className="flex flex-1 flex-row justify-items-start items-center  ">
                        {props.bgColor ?
                            <img src={heartbeatgreen} alt="" className="pr-4 w-12 " /> :
                            <img src={heartbeat} alt="" className="pr-4 w-12 " />

                        }
                        <p className=" text-xl ">{props.patient.heartbeat} bpm</p>
                    </div>
                </div>



                <div className="flex flex-row w-full px-4">
                    <div className="flex flex-1 flex-row justify-items-start items-center  text-lg ">
                        {props.bgColor ?
                            <img src={heightgreen} alt="" className="pr-4 w-12 " /> :
                            <img src={height} alt="" className="pr-4 w-12 " />

                        }
                        <p className=" text-xl ">{props.patient.height} cm</p>
                    </div>

                    <div className="flex flex-1 flex-row justify-items-start items-center  ">
                        {props.bgColor ?
                            <img src={bloodgreen} alt="" className="pr-4 w-12 " /> :
                            <img src={blood} alt="" className="pr-4 w-12 " />

                        }
                        <p className=" text-xl ">{props.patient.hg_count} g/dl</p>
                    </div>
                </div>

                {/* Symptoms list*/}
                <div className="symptoms  w-full py-4 px-4 rounded-xl bg-white mt-2">

                    <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="text-xl font-semibold">Symptoms</h1>
                        <i className="fas fa-plus text-xl"></i>

                    </div>



                    <div className={`text-lg mt-2 flex flex-row flex-wrap justify-center items-center space-y-1 `}>



                        {props.symptoms.map((s) => {
                            return (
                                <div className={`flex flex-row py-1 px-1 items-center justify-center text-white ${props.bgColor ? 'bg-headinggreen' : 'bg-headingblue'} mx-1 rounded-3xl`}>
                                    <p>{s}</p>
                                    <i className="fas fa-times ml-1 text-base"></i>
                                </div>
                            )
                        }
                        )}

                    </div>
                </div>


                {/* Medical history */}
                <div className="medical_history  w-full py-4 px-4 bg-white rounded-2xl my-4">
                    <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="text-xl font-semibold">Medical History</h1>
                        <i className="fas fa-plus text-xl"></i>

                    </div>
                    <div className="grid grid-cols-3 text-lg mt-2">
                        {props.patient.medical_history !== "" && props.patient.medical_history.map((his) => {
                            return (
                                <div className={`flex flex-row py-1 items-center justify-center text-white ${props.bgColor ? 'bg-headinggreen' : 'bg-headingblue'} mx-1 rounded-3xl`}>

                                    <p>{his}</p>
                                    <i className="fas fa-times ml-1 text-base"></i>
                                </div>
                            )
                        })}
                    </div>
                </div>


            </div>
        </div>

    )
}

export default PatientNotes
