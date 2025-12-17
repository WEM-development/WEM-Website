import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add enviroment keys
const firebaseConfig = {
  apiKey: "AIzaSyDIRoWWjiT8xhzKWjecyF8xSEuka565vxk",
  authDomain: "wem-website.firebaseapp.com",
  projectId: "wem-website",
  storageBucket: "wem-website.firebasestorage.app",
  messagingSenderId: "767727234228",
  appId: "1:767727234228:web:94a0edf13f4a6e3baebbe1",
  measurementId: "G-1VDNVBM5SB"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)

