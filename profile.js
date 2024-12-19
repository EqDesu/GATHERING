
  // Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9lmHvPKxwcgU0UUAEzxIr5jJzQma_yEo",
  authDomain: "eqjawa-cihuy.firebaseapp.com",
  projectId: "eqjawa-cihuy",
  storageBucket: "eqjawa-cihuy.appspot.com",
  messagingSenderId: "881496252840",
  appId: "1:881496252840:web:dc88ca17028a6bf7093d9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Fungsi untuk memperbarui profil pengguna
function updateProfile() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmail = user.email;
      const displayName = user.displayName;
      const userProfilePicture = user.photoURL;

      // Perbarui elemen HTML
      document.getElementById('userEmail').innerHTML = userEmail;
      document.getElementById('displayName').innerHTML = displayName;
      document.getElementById('userProfilePicture').src = userProfilePicture;
    } else {
      // Pengguna belum masuk
      console.log('Pengguna belum masuk');
    }
  });
}

// Panggil fungsi updateProfile saat halaman dimuat
updateProfile();