"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// データベースの代わりにメモリ管理
let posts = [];
let votes = {};
let nextId = 1;

// 📌 投票機能用の投稿
app.post('/post-vote', (req, res) => {
    const { name, message } = req.body;
    const newPost = { id: nextId++, name, message, votes: 0 };
    posts.push(newPost);
    res.json(newPost);
});

// 📌 投票機能
app.post('/vote', (req, res) => {
    const { id } = req.body;
    const post = posts.find(p => p.id === parseInt(id));
    if (post) {
        post.votes++;
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// サーバー起動
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
