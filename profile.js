
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9lmHvPKxwcgU0UUAEzxIr5jJzQma_yEo",
  authDomain: "eqjawa-cihuy.firebaseapp.com",
  projectId: "eqjawa-cihuy",
  storageBucket: "eqjawa-cihuy.firebasestorage.app",
  messagingSenderId: "881496252840",
  appId: "1:881496252840:web:dc88ca17028a6bf7093d9d",
  measurementId: "G-6BT98ZZ433"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const user = auth.currentUser;

  // Function to update the user profile
  function updateUserProfile(user) {
    const userName = user.displayName || "No Name Provided";
    const userEmail = user.email;
    const userProfilePicture = user.photoURL || "brand-assets/profile.png";
    const emailVerified = user.emailVerified;

    // Update the profile section with user data
    document.getElementById("displayName").textContent = userName;
    document.getElementById("email").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;

    const verificationBadge = document.getElementById("verificationStatus").querySelector("span");
    verificationBadge.textContent = emailVerified ? "Verified" : "Not Verified";
    verificationBadge.className = emailVerified ? "badge bg-success" : "badge bg-danger";
  }

  // Add the onAuthStateChanged listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, call the updateUserProfile function
      updateUserProfile(user);
      console.log(user)
    } else {
      // User is not signed in, redirect to the registration page
      alert("Create Account & login");
      //window.location.href = "/register.html";
    }
  });

   // Logout function
   document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
      // Sign-out successful, redirect to the login page
      window.location.href = "/index.html";
    }).catch((error) => {
      // An error happened during sign-out
      console.error("Sign-out error:", error);
    });
  });
