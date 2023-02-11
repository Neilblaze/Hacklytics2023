import React, {useState} from 'react'
import Container from '../components/Container'
import SignUpImage from "../images/SignUpLogo.png"
import FacebookLogo from "../images/facebook.png"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Redirect } from "react-router-dom";
import { app } from '../firebaseConfig';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const auth = getAuth();
var db = getFirestore();

function SignUp() {
    const [currentUser, setCurrentUser] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { fullName, email, password, confirmPassword } = e.target.elements;
        console.log(e.target)
        if (password.value !== confirmPassword.value){
            alert("password must equal confirm password")
            return
        }
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(async (userCredential) => {
                alert("You have succsefully signed up!!");
                // save this in the database
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        name: fullName.value,
                        email: email.value,
                    });
                    console.log("Document written with ID: ", docRef.id);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }

                setCurrentUser(true);
            }).catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        alert("Email already in use.");
                        break;
                    case "auth/invalid-email":
                        alert("Invalid email.");
                        break;
                    case "auth/weak-password":
                        alert("Password should be at least 6 characters.");
                        break;
                    default:
                        alert(error.message);
                }
            })
        };

    if (currentUser) {
        return <Redirect to={"/login"} />;
    }

    return (
        <Container>
            <div className="bg-gray-100 h-full flex flex-col place-items-center place-content-center overflow-scroll" style={{height:"865px"}}>
            <img src={SignUpImage} alt="" className="mb-4 mt-28 w-3/5"/>
            <h1 className="text-5xl font-bold text-center w-1/2 mb-8" style={{ color: '#30429E' }}>Sign Up</h1>
            <div className="flex flex-col justify-center items-center z-40" >
            <form action="" className="flex flex-col justify-center" onSubmit={handleSubmit}>
                <div className="flex flex-row place-items-center place-content-center mb-4 px-4 py-2 rounded-lg text-lg text-gray-500 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input className="focus:bg-white" style={{ width: '280px' }} type="text" name="fullName" id="" placeholder="Full name" />
                </div>  
                <div className="flex flex-row place-items-center place-content-center mb-4 px-4 py-2 rounded-lg text-lg text-gray-500 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input className="focus:bg-white" style={{ width: '280px' }} type="email" name="email" id="" placeholder="Email Address" />
                </div>    
                <div className="flex flex-row place-items-center place-content-center mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input className="focus:bg-white" style={{ width: '280px' }} type="password" name="password" id="" placeholder="Confirm Password" />
                </div>   
                <div className="flex flex-row place-items-center place-content-center mb-4 px-4 py-2 rounded-md text-lg text-gray-500 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input className="focus:bg-white" style={{ width: '280px' }} type="password" name="confirmPassword" id="" placeholder="Confirm Password" />
                </div> 
                <button type="submit" className="bg-blue-700 text-2xl text-white rounded-xl p-4 w-full mt-4"> Sign up</button>  
                </form>
                <div className="mb-8 flex flex-col rounded-md justify-center items-center" style={{ fontSize: '18px' }}>
                    <p className="text-xl text-blue-800 mt-8"> Sign in with </p>
                    <div className="flex flex-row justify-between items-center mt-4">
                        <img src={FacebookLogo} alt="sign in with facebook" className="w-12 h-12" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="sign in with google" className="w-12 h-12 ml-6" />
                    </div>
                </div>
                <p className="text-xl text-blue-800 mb-8">Already have an account? <span className="font-base text-blue-800 underline">Sign in</span></p>
                </div>
            </div>
        </Container >
    )
}

export default SignUp
