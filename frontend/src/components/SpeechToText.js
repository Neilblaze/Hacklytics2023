import React from 'react'
import attach from '../images/attach.png'
import save from '../images/save.png'

import adjleft from '../images/adjleft.png'
import adjcenter from '../images/adjcenter.png'
import adjright from '../images/adjright.png'
import list from '../images/list.png'
import bold from '../images/bold.png'
import underline from '../images/underline.png'
import italic from '../images/italic.png'
import soundwave from '../images/soundwave.png'

import diagnose1 from '../images/diagnose1.png'

import diagnose2 from '../images/diagnose2.png'

import {useHistory} from 'react-router-dom';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Container from './Container'

function SpeechToText(props) {
    const history = useHistory()
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    return (
        <>
            <div className="relative z-40 bg-white w-full rounded-t-3xl px-4 py-3 font-lato">
                <form action="" onSubmit={(e) => props.handlePrediction(e)}>

                    <div className="flex flex-row justify-between items-center mb-4">
                        <h1 className="font-semibold text-2xl text-headinggreen">Notes</h1>
                        <div className="flex flex-row">
                            <img src={attach} className="w-8 mr-3" alt="" />
                            <img src={save} className="w-8" alt="" />
                        </div>
                    </div>

                    <input type="text" name="" id="" className="px-2 text-xl text-gray-500 rounded-lg outline-none focus:ring-2  focus:ring-headinggreen mb-2 w-full" placeholder="Title..." />

                    <textarea name="" id="" cols="36" rows="8" placeholder="Type here..." className="text-base w-full outline-none focus:ring-2  focus:ring-headinggreen px-2" value={transcript} onChange={(e) => {
                        props.setNote(e.target.value)
                        props.handleNoteChange(e.target.value)
                    }
                    }></textarea>



                    <div className="flex flex-row items-center w-full">

                        <div className="flex flex-row justify-evenly items-center px-6 py-2 space-x-4 border border-gray-200 flex-1 rounded-2xl mr-2">
                            <img className="h-5" src={adjleft} alt="" />
                            <img className="h-5" src={adjcenter} alt="" />
                            <img className="h-5" src={adjright} alt="" />
                            <img className="h-5" src={list} alt="" />
                            <img className="h-5" src={bold} alt="" />
                            <img className="h-5" src={underline} alt="" />
                            <img className="h-5" src={italic} alt="" />
                        </div>
                        {/*    <div className="flex flex-row justify-center items-center text-white bg-headinggreen w-16 h-16 rounded-full text-2xl" onTouchStart={SpeechRecognition.startListening}
                            onMouseDown={SpeechRecognition.startListening}
                            onTouchEnd={() => {
                                SpeechRecognition.stopListening();
                                props.setNote(transcript);
                                props.handleNoteChange(transcript);
                            }}
                            onMouseUp={() => {
                                SpeechRecognition.stopListening();
                                props.setNote(transcript);
                                props.handleNoteChange(transcript);
                            }}>
                            {listening ? <i class="fas fa-stop"></i> : <i className="fas fa-microphone "></i>}

                        </div>*/}

                        <div className="flex flex-row justify-center items-center text-white bg-headinggreen w-16 h-16 rounded-full text-2xl">
                            <i className="fas fa-microphone" onClick={SpeechRecognition.startListening({ continuous: true })}></i>
                        </div>




                    </div>

                    {listening &&
                        <div className="flex flex-row justify-center items-center mx-auto text-white text-2xl bg-headinggreen rounded-full w-full h-10" onClick={() => {
                            SpeechRecognition.stopListening();
                            props.setNote(transcript);
                            props.handleNoteChange(transcript);
                        }}>
                            <p>ANALYZE THE TEXT</p>
                        </div>
                    }


                    <div className=" bg-headinggreen text-white mt-8 flex flex-row justify-center items-center px-6 py-3 rounded-3xl cursor-pointer" >
                        <img src={diagnose1} alt="" />
                        <button onClick={(e) => {props.handleDiagnosis(e)
                        }} type="submit" className="bg-transparent w-full text-3xl font-medium">Diagnose patient</button>
                        <img src={diagnose2} alt="" />
                    </div>
                </form>
            </div>

        </>
    )
}

export default SpeechToText
