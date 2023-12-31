// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

import { getDatabase, ref, onValue, set } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCl-Y_JSxAe33lspMOKOpyTJVileTtLqv0',
  authDomain: 'projetoteste3-a4608.firebaseapp.com',
  projectId: 'projetoteste3-a4608',
  storageBucket: 'projetoteste3-a4608.appspot.com',
  messagingSenderId: '273504876376',
  appId: '1:273504876376:web:092fe44c7d23616cb6972d',
  measurementId: 'G-FCWQB7NFQE',
  databaseURL: 'https://projetoteste3-a4608-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

let userId;
let userName;
let userPhoto;

export function myloginWithGoogle(setUser) {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      userId = user.uid;
      userName = user.displayName;
      userPhoto = user.photoURL;
      console.log(user.displayName);
      setUser({
        nome: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function myLogout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.reload(true);
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

export function sendToRealtimeDatabase() { }

export function activateUpdate(setState) {
  const db = getDatabase(app);
  const starCountRef = ref(db, '/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    
    const dataArray = Object.keys(data).map(key => data[key]);
    console.log(dataArray);
    setState(dataArray);

  });
}

export function writeUserData(texto) {
  const db = getDatabase(app);
  let aux = Date.now();
  set(ref(db, '/' + aux), {
    text: texto,
    user: userName,
    photo: userPhoto,
    time: Date.now()
  });
}