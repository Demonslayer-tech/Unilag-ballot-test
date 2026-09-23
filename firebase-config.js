// ============================================================
// FIREBASE CONFIG — REPLACE WITH YOUR OWN PROJECT CREDENTIALS
// ============================================================
// Get these from: Firebase Console → Project Settings → General
// → "Your apps" → Web app → SDK setup and configuration
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1qrXlTYS7B4QftAs6o92WY3nMiW2kLuo",
  authDomain: "unilag-ballot-project.firebaseapp.com",
  projectId: "unilag-ballot-project",
  storageBucket: "unilag-ballot-project.firebasestorage.app",
  messagingSenderId: "667559096297",
  appId: "1:667559096297:web:2cb5d44cd182c329b12578",
  measurementId: "G-9Q6VSBNT9R"
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firebase Auth needs an email format, but the portal only collects
// a Matric Number. This turns "CSC/2024/1140" into a valid,
// unique pseudo-email so Firebase Auth accepts it unchanged.
export function matricToEmail(matric) {
  return matric.trim().toLowerCase().replace(/[^a-z0-9]/g, "") + "@unilag-portal.local";
}
