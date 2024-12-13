// Import the functions needed from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9lmHvPKxwcgU0UUAEzxIr5jJzQma_yEo",
  authDomain: "eqjawa-cihuy.firebaseapp.com",
  projectId: "eqjawa-cihuy",
  storageBucket: "eqjawa-cihuy.firebaseapp.com",
  messagingSenderId: "881496252840",
  appId: "1:881496252840:web:dc88ca17028a6bf7093d9d",
  measurementId: "G-6BT98ZZ433"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Register
document.getElementById("register-form")?.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page refresh

  // Get email and password input
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // Process registration with Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Registration successful! You can now log in.");
      console.log("User registered:", user);
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Registration error:", error.message);
      alert("Registration failed: " + error.message);
    });
});
