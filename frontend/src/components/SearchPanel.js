import React from 'react'

function SearchPanel(props) {
    return (
        <div className="flex flex-row justify-between items-center mt-6">
            <div className="search bg-white border border-gray-50 px-2  rounded-2xl flex flex-row justify-start items-center w-10/12 py-1">

                <i className={`fas fa-search text-lg ${props.color ? props.color : 'text-headingblue'}`}></i>
                <input className="bg-transparent ml-3 text-gray-600 text-lg" type="text" name="" id="" placeholder="Search diets" />
            </div>

            <i class={`fas fa-filter text-3xl ${props.color ? props.color : 'text-headingblue'}`}></i>
        </div>
    )
}

export default SearchPanel
