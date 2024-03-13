import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "codingplace2023.firebaseapp.com",
	databaseURL: "https://codingplace2023-default-rtdb.firebaseio.com",
	projectId: "codingplace2023",
	storageBucket: "codingplace2023.appspot.com",
	messagingSenderId: "1078516885903",
	appId: "1:1078516885903:web:6c76352a03b62d53c483fa",
	measurementId: "G-B1GM87LSSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DATABASE = getFirestore(app);
