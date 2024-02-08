// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3MBpAKcn0w_C5EW4HCDF0T8IKF7vntps",
    authDomain: "martin-varbanov.firebaseapp.com",
    projectId: "martin-varbanov",
    storageBucket: "martin-varbanov.appspot.com",
    messagingSenderId: "478850414000",
    appId: "1:478850414000:web:2ec3d38a2d5894de4c9275",
    measurementId: "G-7692YCR5BV"
};
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_MV_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_MV_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_MV_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_MV_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MV_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_MV_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_MV_FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const analytics = getAnalytics(firebase);

export { firebase, firestore, analytics };