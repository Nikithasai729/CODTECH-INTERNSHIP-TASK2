let currentUser = "";


async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        alert("Login failed");
        return;
    }

    const data = await res.json();

    currentUser = data.username;

    document.getElementById("userLabel").innerText = "User: " + currentUser;

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("chatPage").classList.remove("hidden");

    loadMessages(); 
}


async function loadMessages() {
    const res = await fetch("/messages");
    const data = await res.json();

    const ul = document.getElementById("messages");
    ul.innerHTML = "";

    data.forEach(msg => {
        addMessage(msg.user, msg.text);
    });
}


async function sendMessage() {
    const msg = document.getElementById("msg").value;

    if (!msg) return;

    await fetch("/send", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user: currentUser,
            text: msg
        })
    });

    addMessage(currentUser, msg);

    document.getElementById("msg").value = "";
}


function addMessage(user, message) {
    const li = document.createElement("li");
    li.classList.add("message");

    li.innerHTML = `<b>${user}:</b> ${message}`;

    const messages = document.getElementById("messages");
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
}


function logout() {
    currentUser = "";

    document.getElementById("chatPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}