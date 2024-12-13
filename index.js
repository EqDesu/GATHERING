// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9lmHvPKxwcgU0UUAEzxIr5jJzQma_yEo",
  authDomain: "eqjawa-cihuy.firebaseapp.com",
  projectId: "eqjawa-cihuy",
  storageBucket: "eqjawa-cihuy.firebasestorage.app", // Update with the correct storage bucket
  messagingSenderId: "881496252840",
  appId: "1:881496252840:web:dc88ca17028a6bf7093d9d",
  measurementId: "G-6BT98ZZ433",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Handle Register
document.getElementById("register-form")?.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah refresh halaman

  // Ambil input email dan password
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // Proses registrasi dengan Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Registration successful! You can now log in.");
      console.log("User registered:", user);
      window.location.href = "index.html"; // Redirect ke halaman login
    })
    .catch((error) => {
      console.error("Registration error:", error.message);
      alert("Registration failed: " + error.message);
    });
});

// Handle Login
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah refresh halaman

  // Ambil input email dan password
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Proses login dengan Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Simulasi validasi owner
      const isOwner = user.email === "equillyptian@gmail.com"; // Ganti dengan logika validasi Anda

      if (isOwner) {
        alert("Login successful as Owner!");
        window.location.href = "menu.html"; // Redirect ke halaman Owner
      } else {
        alert("Login successful, but you do not have owner access.");
        window.location.href = "menu.html"; // Redirect ke menu umum
      }
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
});

// Check User Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User sudah login
    console.log("User authenticated:", user);

    // Simulasi validasi owner
    const isOwner = user.email === "equillyptian@gmail.com";

    if (isOwner) {
      // Tampilkan fitur owner jika diperlukan
      const ownerFeatures = document.getElementById("owner-features");
      if (ownerFeatures) ownerFeatures.style.display = "block";
    } else {
      // Jika bukan pemilik dan mencoba mengakses halaman owner
      const currentPath = window.location.pathname;
      if (currentPath.includes("owner-page.html")) {
        alert("You are not authorized to access this page.");
        window.location.href = "menu.html";
      }
    }
  }
});
