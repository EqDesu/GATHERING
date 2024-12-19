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


// Fungsi mengirim pesan
function kirimPesan(pesan) {
  db.collection("pesan").add({
    pesan: pesan,
    waktu: new Date()
  })
  .then((docRef) => {
    console.log("Pesan terkirim!");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

// Event listener untuk mengirim pesan
document.getElementById('kirim-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const pesanInput = document.getElementById('pesan-input');
  const pesan = pesanInput.value;
  kirimPesan(pesan);
  pesanInput.value = '';
});

// Membaca pesan dari Firebase
db.collection("pesan").orderBy("waktu", "desc").onSnapshot((querySnapshot) => {
  const pesanList = document.getElementById('pesan-list');
  pesanList.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const pesanHTML = `
      <div class="pesan penerima">
        ${doc.data().pesan}
      </div>
    `;
    pesanList.insertAdjacentHTML('beforeend', pesanHTML);
  });
});