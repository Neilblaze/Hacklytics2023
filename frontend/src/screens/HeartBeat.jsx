import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import bell from '../images/bell.png'
import { useHistory, useLocation } from 'react-router-dom';
import { getFirestore, collection, addDoc } from "firebase/firestore";


const OPENCV_URI = "https://docs.opencv.org/master/opencv.js";
const HAARCASCADE_URI = "/haarcascade_frontalface_alt.xml"


function HeartBeatScreen(props) {
  const loc = useLocation();
  const history = useHistory();
  // useScript("https://prouast.github.io/heartbeat-js/heartbeat.js")
  // useScript("/opencv.js")
  useScript("/heartbeat-main.js")



  // Load opencv when needed
  async function loadOpenCv(uri) {
    return new Promise(function (resolve, reject) {
      console.log("starting to load opencv");
      var tag = document.createElement('script');
      tag.src = uri;
      tag.async = true;
      tag.type = 'text/javascript'
      tag.onload = () => {
        window.cv['onRuntimeInitialized'] = () => {
          console.log("opencv ready");
          resolve();
        }
      };
      tag.onerror = () => {
        throw new URIError("opencv didn't load correctly.");
      };
      var firstScriptTag = document.getElementById('heartbeat-container');
      firstScriptTag.appendChild(tag);
    });
  }


  const handleFunc = (val) => {
    setTimeout(() => {
      let demo = new window.Heartbeat("webcam", "canvas", HAARCASCADE_URI, 30, 6, 250);

      var ready = loadOpenCv(OPENCV_URI);
      ready.then(function () {
        demo.init();
      });
    }, 3000)
    console.log(val)
  }

  useEffect(() => {
    handleFunc()
  }, [])



  return (
    <Container>
      <div className="card-bg">

        <div className="flex flex-row justify-center items-center pl-4 mt-4 w-full  text-base-200 ">
          <button onClick={() => history.goBack()} className="pr-6"><i className="fas fa-chevron-left text-4xl  "></i></button>

          <div className="flex flex-col flex-1 justify-center items-start">
            <h1 className=" font-semibold text-gray-200" style={{ fontSize: '32px' }}>Heartbeat</h1>
          </div>
          <div className=" pr-3">
            <img src={bell} alt="" className="" />
          </div>
        </div>


        {/* <div className="content absolute top-0 left-0 w-full h-full z-30  ">
                    <Heartbeat heartbeatFunction={handleFunc} heartbeatInterval={1000} />
                </div> */}


        <div className='text-gray-400 mt-7 text-sm'>
          Please look into the camera, and avoid any sudden movement for best results. 🙂
        </div>

        <video hidden id="webcam" width="640" height="480"></video>
        <canvas id="canvas" width="640" className='w-full my-10' height="480"></canvas>
        <div id="heartbeat-container">
        </div>
      </div>

      {/* <script src="" /> */}
      {/* <script src="" async="" type="text/javascript"></script> */}
    </Container>
  )
}

export default HeartBeatScreen;



// Hook
function useScript(src) {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(src ? "loading" : "idle");
  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus("idle");
        return;
      }
      // Fetch existing script element by src
      // It may have been added by another intance of this hook
      let script = document.querySelector(`script[src="${src}"]`);
      if (!script) {
        // Create script
        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.setAttribute("data-status", "loading");
        // Add script to document body
        document.body.appendChild(script);
        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            "data-status",
            event.type === "load" ? "ready" : "error"
          );
        };
        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute("data-status"));
      }
      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(event.type === "load" ? "ready" : "error");
      };
      // Add event listeners
      script.addEventListener("load", setStateFromEvent);
      script.addEventListener("error", setStateFromEvent);
      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent);
          script.removeEventListener("error", setStateFromEvent);
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );
  return status;
}
