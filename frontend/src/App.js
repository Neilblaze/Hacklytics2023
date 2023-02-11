import SignIn from "./screen/SignIn";
import SignUp from "./screen/SignUp";
import { app } from './firebaseConfig';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { AuthProvider } from "./Auth";
import { getAuth, signOut } from "firebase/auth";
import Test from "./components/Test";
import PatientNoteScreen from "./screens/PatientNoteScreen";
import SelectPatientsNotes from "./screens/SelectPatientsNotes";
import SelectPatientsDiagnose from "./screens/SelectPatientsDiagnose";
import SpeechToText from "./components/SpeechToText";
import PatientDiagnosisScreen from "./screens/PatientDiagnosisScreen";
import AddPatient from "./screens/AddPatient";
import HomePageScreen from "./screens/HomePageScreen";

function App() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {user ? <div><p> {`signed in as ${user.email}`}</p><button className="bg-blue-700 text-2xl text-white rounded-xl p-4 w-full mt-4" onClick={() => { signOut(auth); alert("refresh page") }}>Sign Out</button></div> : <p>No user found. go to /signup</p>}
            </Route>


            <Route exact path='/login'>
              <div className="flex justify-center bg-black">
                <SignIn />
              </div>
            </Route>


            <Route exact path='/signup'>
              <div className="flex justify-center bg-black">
                <SignUp />
              </div>

            </Route>

            <Route exact path='/home/:docId'>
              <div className="flex justify-center bg-black">
                <HomePageScreen />
              </div>


            </Route>

            <Route path="/test" exact>
              <div className="flex justify-center">
                <SpeechToText />
              </div>
            </Route>

            <Route path="/patients-notes/:doctorId" exact>
              <div className="flex justify-center bg-black">
                <SelectPatientsNotes />
              </div>
            </Route>

            <Route path="/patients-diagnose/:doctorId" exact>
              <div className="flex justify-center bg-black">
                <SelectPatientsDiagnose />
              </div>
            </Route>

            <Route path="/patient/add/:doctorid" exact>
              <div className="flex justify-center bg-black">
                <AddPatient />
              </div>
            </Route>

            <Route path="/patient/:doctorId/:patientId" exact>
              <div className="flex justify-center bg-black">
                <PatientNoteScreen />
              </div>
            </Route>

            <Route path="/patient-predict-diagnosis/:doctorId/:patientId/:diagnosis" exact>
              <div className="flex justify-center bg-black">
                <PatientDiagnosisScreen />
              </div>
            </Route>



          </Switch>

        </BrowserRouter>
      </div>
    </AuthProvider>

  );
}

export default App;
