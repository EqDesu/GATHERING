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
      console.error("Login error:", error);
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
