import React from 'react'
import Container from '../components/Container'
import profilepic from '../images/profilepic.png'
import bell from '../images/bell.png'
import SearchPanel from '../components/SearchPanel'
import PatientsList from '../components/PatientsList'
import { useHistory, useLocation } from 'react-router-dom';


function SelectPatientsNotes(props) {
    const history = useHistory();
    const loc = useLocation();

    return (
        <Container>
            {/* <div className="absolute w-full h-full bg-pgray z-10"></div> */}
            <div className="card-bg w-full h-full z-30">
                {/* <h1 className="text-3xl font-bold mt-5 pl-6 w-full text-gray-300">Patient Notes</h1> */}

                <div className="w-full flex flex-col justify-center items-center ">
                        <div className="">
                            <div className="   ">

                                <div className="flex flex-row justify-center items-start pl-4 mt-2">
                                    <button onClick={() => history.goBack()} className="pr-4"><i className="fas fa-chevron-left text-4xl text-gray-400 "></i></button>

                                    <div className="flex flex-col flex-1 justify-center items-start">
                                        <h1 className="text-3xl font-semibold text-gray-300">Patient Notes</h1>
                                        <p className="text-lg text-gray-300">Select one of the below to make notes</p>
                                    </div>
                                    <div className="">
                                        <img src={bell} alt="" className="" />
                                    </div>
                                </div>

                                <img src='/Saly-10.svg' className='w-7/12 mb-10 mx-auto'/>


                                {/* Search panel with filter icon */}
                                <SearchPanel />

                                {/* Patients list */}
                                <PatientsList doctorId={loc.pathname.split("/")[2]} />

                            </div>

                        </div>


                </div>
            </div>
        </Container>
    )
}

export default SelectPatientsNotes
