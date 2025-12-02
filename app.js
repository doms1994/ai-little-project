let username = "";

// Elements
const popup = document.getElementById("namePopup");
const chatContainer = document.getElementById("chatContainer");
const messageBox = document.getElementById("messageBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");


// Enter chat button
document.getElementById("enterChatBtn").addEventListener("click", () => {
    const input = document.getElementById("usernameInput").value.trim();

    if (input.length < 2) {
        alert("Please enter a valid name.");
        return;
    }

    username = input;

    popup.classList.add("hidden");
    chatContainer.classList.remove("hidden");

    loadMessages();
    setInterval(loadMessages, 1000);   // auto-refresh every second
});


// Load all messages
function loadMessages() {
    fetch("load_messages.php")
        .then(res => res.json())
        .then(data => {
            messageBox.innerHTML = "";

            data.forEach(msg => {
                addMessageToUI(msg.name, msg.text);
            });

            messageBox.scrollTop = messageBox.scrollHeight;
        })
        .catch(err => console.error("Load error:", err));
}


// Add message bubble to UI
function addMessageToUI(name, text) {
    const div = document.createElement("div");
    div.classList.add("message");

    if (name === username) div.classList.add("myMessage");

    div.innerHTML = `<strong>${name}:</strong> ${text}`;
    messageBox.appendChild(div);
}


// Send a message
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    fetch("write.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${encodeURIComponent(username)}&message=${encodeURIComponent(text)}`
    })
    .then(res => res.text())
    .then(() => {
        messageInput.value = "";
        loadMessages(); // refresh immediately
    })
    .catch(err => console.error("Send error:", err));
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
