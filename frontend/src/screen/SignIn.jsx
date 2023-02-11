import React, {useContext} from 'react'
import Container from '../components/Container'
import SignInImage from "../images/SignInLogo.png"
import FacebookLogo from "../images/facebook.png"
import { useHistory } from "react-router-dom";
import { app } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut  } from "firebase/auth";
import { AuthContext } from '../Auth';
import { collection, query, where, getFirestore, getDocs } from "firebase/firestore";


const auth = getAuth();
const db = getFirestore();

function SignIn() {
    let history = useHistory();
    const handleLogin = (e) => {
        e.preventDefault();   

        const { email, password } = e.target.elements;
        signInWithEmailAndPassword(auth, email.value, password.value)      
        .catch((error) =>{
            switch(error.code) {
                case "auth/user-disabled":
                    alert("User is disabled."); 
                    break;                  
                case "auth/invalid-email":
                    alert("Invalid email.");
                    break;
                case "auth/user-not-found":
                    alert("User not found.");
                    break;
                case "auth/wrong-password":
                    alert("Wrong password.");
                    break;  
                default:
                    alert(error.message);                 
            }
        })
    };
    
    const signInWithGoogle =() => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user)

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
  });
    }

    const signInWithFacebook = () => {}

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        const email = currentUser.email;
        const q = query(collection(db, "users"), where("email", "==", email));
        let docId = 0
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id)
                docId = doc.id
                history.push(`/home/${docId}`);
            });
        })
    }

    return (
        <Container>
            <div className="bg-gray-100 h-full flex flex-col place-items-center place-content-center">
            <img src={SignInImage} alt="" className="mb-4"/>
            <h1 className="text-6xl font-bold text-center w-1/2 mb-8" style={{ color: '#30429E' }}>Welcome Back!</h1>
            <div className="flex flex-col justify-center items-center z-40" >
                <form action="" className="flex flex-col justify-center" onSubmit={handleLogin}>
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
                <input className="focus:bg-white" style={{ width: '280px' }} type="password" name="password" id="" placeholder="Password" />
                </div>   
                <p className="text-lg text-blue-800 mb-4 text-center" style={{color:'#rgba(48, 66, 158, 0.9)'}}>Forgot password?</p>
                <button type="submit"  className="bg-blue-700 text-2xl text-white rounded-xl p-4 w-full">Sign in</button>
                </form>
                <div className="mb-8 flex flex-col rounded-md justify-center items-center" style={{ fontSize: '18px' }}>
                    <p className="text-xl text-blue-800 mt-8"> Sign in with </p>
                    <div className="flex flex-row justify-between items-center mt-4">
                        <button onClick={() => signInWithFacebook()}><img src={FacebookLogo} alt="sign in with facebook" className="w-12 h-12" /></button>
                        <button onClick={() => signInWithGoogle()}> <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="sign in with google" className="w-12 h-12 ml-6" /></button>
                    </div>
                </div>
                <a href="/signup" className="text-xl text-blue-800">Don't have an account? <span className="font-base text-blue-800 underline">Sign up</span></a>
                </div>
            </div>
        </Container >
    )
}

export default SignIn
