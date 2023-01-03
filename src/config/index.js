import {
    initializeApp
} from "firebase/app";
import {
    getAnalytics
} from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// let firebaseAuth;

const firebaseConfig = {
    apiKey: "AIzaSyB2kQ46xBYG-B4Nh4uiojnbcwI36h3oVog",
    authDomain: "my-link-52bb8.firebaseapp.com",
    databaseURL: "https://my-link-52bb8-default-rtdb.firebaseio.com",
    projectId: "my-link-52bb8",
    storageBucket: "my-link-52bb8.appspot.com",
    messagingSenderId: "256882802786",
    appId: "1:256882802786:web:1d67f53ada9bf3a1a0d13b",
    measurementId: "G-ZKNGB3VNGN"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);


const firebaseAuth = getAuth()
const firebaseAuthWithFire = getAuth(firebase)
export {firebase, firebaseAuth,firebaseAuthWithFire};
// export default firebase