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


// Handle Registration
document.getElementById("register-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Registration successful!");
      window.location.href = "index.html";
    })
    .catch((error) => alert(error.message));
});

// Handle Login
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "menu.html";
    })
    .catch((error) => alert(error.message));
});

// Menu Page
if (window.location.pathname.endsWith("menu.html")) {
  const profileIcon = document.getElementById("profile-icon");
  const profileInfo = document.getElementById("profile-info");
  const userEmail = document.getElementById("user-email");
  const logoutButton = document.getElementById("logout");

  auth.onAuthStateChanged((user) => {
    if (user) {
      userEmail.textContent = `Email: ${user.email}`;
    } else {
      window.location.href = "index.html";
    }
  });

  profileIcon.addEventListener("click", () => {
    profileInfo.style.display = profileInfo.style.display === "block" ? "none" : "block";
  });

  logoutButton.addEventListener("click", () => {
    auth.signOut()
      .then(() => {
        alert("Logged out!");
        window.location.href = "index.html";
      })
      .catch((error) => alert(error.message));
  });
}