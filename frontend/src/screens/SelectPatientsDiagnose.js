import React from 'react'
import Container from '../components/Container'
import profilepic from '../images/profilepic.png'
import bellgreen from '../images/bellgreen.png'
import SearchPanel from '../components/SearchPanel'
import PatientsList from '../components/PatientsList'
import {useHistory, useLocation} from 'react-router-dom'

function SelectPatientsDiagnose() {
    const history = useHistory();
    const loc = useLocation();
    
    return (
        <Container>
            {/* <div className="absolute w-full h-full bg-bggreen z-10"></div> */}

            <div className="card-bg">

                <div className="w-full flex flex-col justify-center items-center ">
                        <div className="">
                            <div className="   ">

                                <div className="flex flex-row justify-center items-start pl-4 mt-2 text-headinggreen">
                                <button onClick={() => history.goBack()}className="pr-4"><i className="fas fa-chevron-left text-4xl text-headingblue "></i></button>

                                    <div className="flex flex-col flex-1 justify-center items-start">
                                        <h1 className="text-3xl font-semibold \">Select patients</h1>
                                        <p className="text-lg \">To make notes</p>
                                    </div>
                                    <div className="">
                                        <img src={bellgreen} alt="" className="" />
                                    </div>
                                </div>

                                <img src='/Saly-10.svg' className='w-7/12 mb-10 mx-auto'/>


                                {/* Search panel with filter icon */}
                                <SearchPanel color="text-headinggreen" />

                                {/* Patients list */}
                                <PatientsList doctorId={loc.pathname.split("/")[2]} />

                            </div>

                        </div>


                </div>
            </div>
        </Container>
    )
}

export default SelectPatientsDiagnose
