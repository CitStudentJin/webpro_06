"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];
let nextId = 1;

// 📌 匿名モード用投稿機能
app.post('/post-anonymous', (req, res) => {
    const { name, message } = req.body;
    const newPost = { id: nextId++, name, message };
    posts.push(newPost);
    res.json(newPost);
});

// サーバー起動
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});

