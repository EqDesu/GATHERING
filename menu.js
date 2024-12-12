<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gathering Zone</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <h1>SELAMAT DATANG DI GATHERING ZONE</h1>
    </header>

    <!-- Kotak Fitur -->
    <div class="feature-container">
        <div class="feature-box">
            <h2>Pengaturan</h2>
            <p>Atur preferensi dan profil Anda di sini.</p>
            <a href="/pengaturan">Akses Pengaturan</a>
        </div>
        <div class="feature-box">
            <h2>Laporan</h2>
            <p>Akses laporan harian atau bulanan Anda.</p>
            <a href="/laporan">Lihat Laporan</a>
        </div>
        <div class="feature-box">
            <h2>Keluar</h2>
            <p>Terima kasih sudah menggunakan Gathering Zone. Sampai jumpa!</p>
            <a href="index.html">Keluar</a>
        </div>
    </div>

    <!-- Fitur Khusus Owner -->
    <div id="owner-features" style="display: none;">
        <div class="feature-box">
            <h2>Kelola Karyawan</h2>
            <p>Tambah, edit, atau hapus data karyawan Anda.</p>
            <a href="/kelola-karyawan">Akses Kelola Karyawan</a>
        </div>
        <div class="feature-box">
            <h2>Kelola Produk</h2>
            <p>Tambah, edit, atau hapus produk Anda.</p>
            <a href="/kelola-produk">Akses Kelola Produk</a>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"></script>
    <script type="module">
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
        const app = firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();

        // Flag untuk menghindari pemeriksaan ulang terlalu sering
        var isCheckingAuth = false;

        // Fungsi untuk memeriksa apakah pengguna adalah pemilik
        function checkOwnerStatus(user) {
            return user && user.email === "equillyptian@gmail.com"; // Ganti dengan email pemilik yang benar
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Memeriksa status pengguna dari Firebase
            firebase.auth().onAuthStateChanged((user) => {
                // Jika sedang dalam proses pemeriksaan, hentikan pemeriksaan
                if (isCheckingAuth) return;

                isCheckingAuth = true; // Set flag agar tidak memeriksa lebih dari sekali

                const ownerFeatures = document.getElementById('owner-features');
                if (checkOwnerStatus(user)) {
                    ownerFeatures.style.display = 'block';
                } else {
                    ownerFeatures.style.display = 'none';
                }

                // Reset flag setelah pemeriksaan selesai
                isCheckingAuth = false;
            });
        });
    </script>
</body>
</html>
