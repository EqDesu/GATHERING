import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9lmHvPKxwcgU0UUAEzxIr5jJzQma_yEo",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "eqjawa-cihuy",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:881496252840:web:dc88ca17028a6bf7093d9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
  } else {
    // User belum login
    console.log("No user authenticated");
    const currentPath = window.location.pathname;
    if (currentPath !== "/index.html") {
      alert("Please login to access this page.");
      window.location.href = "index.html"; // Redirect ke halaman login
    }
  }
});
