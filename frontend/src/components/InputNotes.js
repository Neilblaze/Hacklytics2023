import React from 'react'
import attach from '../images/attach.png'
import save from '../images/save.png'
import microphone from '../images/microphone.png'

import adjleft from '../images/adjleft.png'
import adjcenter from '../images/adjcenter.png'
import adjright from '../images/adjright.png'
import list from '../images/list.png'
import bold from '../images/bold.png'
import underline from '../images/underline.png'
import italic from '../images/italic.png'

import diagnose1 from '../images/diagnose1.png'

import diagnose2 from '../images/diagnose2.png'
function InputNotes() {
    return (
        <>
            <div className="relative z-40 bg-white w-full rounded-t-3xl px-4 py-3 font-lato">
                <form action="">

                    <div className="flex flex-row justify-between items-center mb-4">
                        <h1 className="font-semibold text-2xl text-headinggreen">Notes</h1>
                        <div className="flex flex-row">
                            <img src={attach} className="w-8 mr-3" alt="" />
                            <img src={save} className="w-8" alt="" />
                        </div>
                    </div>

                    <input type="text" name="" id="" className="text-xl text-gray-500 rounded-lg focus:ring-2  focus:ring-headinggreen mb-2 w-full" placeholder="Title..." />
                    <textarea name="" id="" cols="36" rows="3" placeholder="Type here..." className="text-base"></textarea>

                    <div className="loading my-4">
                        Loading
                    </div>

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

                        <div className="flex flex-row justify-center items-center text-white bg-headinggreen w-16 h-16 rounded-full">
                            <i className="fas fa-microphone text-2xl"></i>
                        </div>
                    </div>

                    <div className=" bg-headinggreen text-white mt-8 flex flex-row justify-center items-center px-6 py-3 rounded-3xl">
                        <img src={diagnose1} alt="" />
                        <button type="submit" className="bg-transparent w-full text-3xl font-medium">Diagnose patient</button>
                        <img src={diagnose2} alt="" />
                    </div>
                </form>
            </div>

        </>
    )
}

export default InputNotes
