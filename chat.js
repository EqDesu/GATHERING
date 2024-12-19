

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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app).ref("messages");

// DOM Elements
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

// Send message
sendBtn.addEventListener("click", () => {
  const message = messageInput.value;
  if (message.trim()) {
    db.push({
      text: message,
      timestamp: Date.now(),
      user: "Anonymous"
    });
    messageInput.value = "";
  }
});

// Listen for new messages
db.on("child_added", (snapshot) => {
  const data = snapshot.val();
  const messageElement = document.createElement("div");
  messageElement.textContent = `${data.user}: ${data.text}`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Go back function
function goBack() {
  window.history.back();
}