
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, getAuth, onAuthStateChanged }from "firebase/analytics";
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
const user = Auth.currentUser


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