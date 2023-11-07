import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "classroom-app-5b3e1.firebaseapp.com",
  projectId: "classroom-app-5b3e1",
  storageBucket: "classroom-app-5b3e1.appspot.com",
  messagingSenderId: "126855485559",
  appId: "1:126855485559:web:988fef22aa72bacf1e8e72",
  measurementId: "G-S2597D52W2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// const analytics = getAnalytics(app);
