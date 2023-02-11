import React from 'react'
import iphone from "../images/iphone.png"
function Container(props) {
    return (
        <div className="relative font-lufga" style={{ width: '460px', height: '896px', overflow: 'hidden', borderRadius: '56px' }} >
            <img src={iphone} alt="" className="absolute top-0 left-0 w-full h-full z-20" />
            {props.children}
        </div>
    )
}

export default Container
