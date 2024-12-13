// Import the functions needed from the Firebase SDKs
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase (ensure firebaseConfig is already defined somewhere)
const auth = getAuth();

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
      window.location.href = "index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Registration error:", error.message);
      alert("Registration failed: " + error.message);
    });
});
