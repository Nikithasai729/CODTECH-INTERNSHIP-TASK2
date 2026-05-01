const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static("public"));

let messages = []; 

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Enter all fields");
    }

    res.json({ username });
});

app.get("/messages", (req, res) => {
    res.json(messages);
});


app.post("/send", (req, res) => {
    const { user, text } = req.body;

    messages.push({ user, text });

    res.send("Message saved");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});