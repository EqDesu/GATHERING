
const firebaseConfig = {
  apiKey: "AIzaSyA9lmHvPKxwcgU0UUAEzxIr5jJzQma_yEo",
  authDomain: "eqjawa-cihuy.firebaseapp.com",
  projectId: "eqjawa-cihuy",
  storageBucket: "eqjawa-cihuy.firebasestorage.app",
  messagingSenderId: "881496252840",
  appId: "1:881496252840:web:dc88ca17028a6bf7093d9d"
};
firebase.initializeApp(firebaseConfig);

// Mengambil data pengguna
const uid = firebase.auth().currentUser.uid;
firebase.firestore().collection("pengguna").doc(uid).get().then(doc => {
  const pengguna = doc.data();
  document.getElementById("nama-pengguna").innerHTML = pengguna.nama;
  document.getElementById("bio").innerHTML = pengguna.bio;
  document.getElementById("alamat").innerHTML = pengguna.alamat;
  document.getElementById("kontak").innerHTML = pengguna.kontak;
});

// Mengedit profil
document.getElementById("edit-profil").addEventListener("click", () => {
  const nama = prompt("Masukkan nama baru:");
  const bio = prompt("Masukkan bio baru:");
  firebase.firestore().collection("pengguna").doc(uid).update({
    nama: nama,
    bio: bio
  }).then(() => {
    location.reload();
  });
});

// Mengubah kata sandi
document.getElementById("ubah-kata-sandi").addEventListener("click", () => {
  const kataSandiLama = prompt("Masukkan kata sandi lama:");
  const kataSandiBaru = prompt("Masukkan kata sandi baru:");
  firebase.auth().currentUser.updatePassword(kataSandiBaru).then(() => {
    alert("Kata sandi berhasil diubah!");
  }).catch(error => {
    alert("Gagal mengubah kata sandi: " + error.message);
  });
});

// Mengupload foto profil
const uploadFoto = document.getElementById("upload-foto");
uploadFoto.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const storageRef = firebase.storage().ref(`fotoprofil/${uid}`);
  storageRef.put(file).then((snapshot) => {
    snapshot.ref.getDownloadURL().then((downloadURL) => {
      firebase.firestore().collection("pengguna").doc(uid).update({
        fotoProfil: downloadURL
      }).then(() => {
        location.reload();
      });
    });
  });
});