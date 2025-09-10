import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvOkBwGyRLsruGGthPitiSXMUiHeMqvIM",
  authDomain: "ai-creator-app-12345.firebaseapp.com",
  projectId: "ai-creator-app-12345",
  storageBucket: "ai-creator-app-12345.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abcdef123456789012"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;