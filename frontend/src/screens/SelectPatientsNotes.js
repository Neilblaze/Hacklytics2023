import React from 'react'
import Container from '../components/Container'
import ScrollArea from 'react-scrollbar'
import profilepic from '../images/profilepic.png'
import bell from '../images/bell.png'
import SearchPanel from '../components/SearchPanel'
import PatientsList from '../components/PatientsList'
import {useHistory, useLocation} from 'react-router-dom';


function SelectPatientsNotes(props) {
    const history = useHistory();
    const loc = useLocation();

    return (
        <Container>
            <div className="absolute w-full h-full bg-pgray z-10"></div>
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

                                <div className="flex flex-row justify-center items-start pl-4 mt-2">
                                    <button onClick={() => history.goBack()}className="pr-4"><i className="fas fa-chevron-left text-4xl text-headingblue "></i></button>

                                    <div className="flex flex-col flex-1 justify-center items-start">
                                        <h1 className="text-3xl font-semibold text-headingblue">Select patients</h1>
                                        <p className="text-lg text-headingblue">To make notes</p>
                                    </div>
                                    <div className="">
                                        <img src={bell} alt="" className="" />
                                    </div>
                                </div>


                                {/* Search panel with filter icon */}
                                <SearchPanel />

                                {/* Patients list */}
                                <PatientsList doctorId={loc.pathname.split("/")[2]} />

                            </div>

                        </div>

                    </ScrollArea>

                </div>
            </div>
        </Container>
    )
}

export default SelectPatientsNotes
