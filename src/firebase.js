import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBpDnoS1LOcY6GBoKi2n8vCT4PMB6fDEic",
  authDomain: "inovarecitech.firebaseapp.com",
  projectId: "inovarecitech",
  storageBucket: "inovarecitech.appspot.com",
  messagingSenderId: "60363290493",
  appId: "1:60363290493:web:38a5ac9e0e66267cef3e14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };