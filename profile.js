<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Friends List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f3f4f6;
      margin: 0;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .friend-list {
      list-style: none;
      padding: 0;
    }

    .friend-list li {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      margin: 5px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .friend-list li:hover {
      background: #f0f8ff;
      transform: scale(1.02);
    }

    .friend-list img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .add-friend {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
    }

    .add-friend input {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .add-friend button {
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .add-friend button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <h1>Friends</h1>
  <div class="container">
    <ul class="friend-list" id="friendList">
      <!-- Daftar teman akan dimuat di sini -->
    </ul>

    <div class="add-friend">
      <h3>Tambah Teman</h3>
      <input type="text" id="friendInput" placeholder="Masukkan email teman">
      <button id="addFriendButton">Tambah Teman</button>
    </div>
  </div>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
    import {
      getFirestore,
      doc,
      getDoc,
      updateDoc,
      query,
      where,
      collection,
      getDocs
    } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyA9lmHvPKxwcgU0UUAEzxIr5jJzQma_yEo",
      authDomain: "eqjawa-cihuy.firebaseapp.com",
      projectId: "eqjawa-cihuy",
      storageBucket: "eqjawa-cihuy.appspot.com",
      messagingSenderId: "881496252840",
      appId: "1:881496252840:web:dc88ca17028a6bf7093d9d"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    let currentUserId;

    // Fungsi untuk menampilkan daftar teman
    async function loadFriends() {
      const friendList = document.getElementById("friendList");
      friendList.innerHTML = "";

      if (currentUserId) {
        const userRef = doc(db, "users", currentUserId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const friends = userDoc.data().friends || {};
          for (const friendId in friends) {
            const friendRef = doc(db, "users", friendId);
            const friendDoc = await getDoc(friendRef);

            if (friendDoc.exists()) {
              const friendData = friendDoc.data();
              const li = document.createElement("li");
              li.style.cursor = "pointer";

              // Navigasi ke halaman chat
              li.addEventListener("click", () => {
                window.location.href = `chat.html?friendId=${friendId}`;
              });

              // Gambar profil
              const img = document.createElement("img");
              img.src = friendData.photoURL || "default.png";
              img.alt = friendData.displayName || "Friend";

              // Nama teman
              const span = document.createElement("span");
              span.textContent = friendData.displayName || "Anonymous";

              li.appendChild(img);
              li.appendChild(span);
              friendList.appendChild(li);
            }
          }
        }
      }
    }

    // Fungsi untuk menambah teman
    async function addFriend(friendIdentifier) {
      if (!currentUserId) return;

      const userQuery = query(
        collection(db, "users"),
        where("email", "==", friendIdentifier)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const friendDoc = querySnapshot.docs[0];
        const friendId = friendDoc.id;

        const currentUserRef = doc(db, "users", currentUserId);
        const currentUserDoc = await getDoc(currentUserRef);
        if (currentUserDoc.exists() && currentUserDoc.data().friends[friendId]) {
          alert("Teman sudah ada di daftar!");
          return;
        }

        await updateDoc(currentUserRef, {
          [`friends.${friendId}`]: true
        });

        const friendRef = doc(db, "users", friendId);
        await updateDoc(friendRef, {
          [`friends.${currentUserId}`]: true
        });

        alert("Teman berhasil ditambahkan!");
        loadFriends();
      } else {
        alert("Pengguna tidak ditemukan.");
      }
    }

    // Event listener untuk tombol tambah teman
    const addFriendButton = document.getElementById("addFriendButton");
    const friendInput = document.getElementById("friendInput");

    addFriendButton.addEventListener("click", () => {
      const friendIdentifier = friendInput.value.trim();
      if (friendIdentifier) {
        addFriend(friendIdentifier);
        friendInput.value = "";
      }
    });

    // Cek status login dan set user ID
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUserId = user.uid;
        loadFriends();
      } else {
        alert("Anda belum login!");
      }
    });
  </script>
</body>
</html>