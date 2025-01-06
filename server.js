"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];
let replies = [];
let votes = {};
let nextId = 1;

/* 📌 シンプル投稿機能 */
app.post('/post-simple', (req, res) => {
    const { name, message } = req.body;
    const newPost = { id: nextId++, name, message };
    posts.push(newPost);
    res.json(newPost);
});

/* 📌 スレッド返信機能 */
app.post('/post-thread', (req, res) => {
    const { name, message } = req.body;
    const newPost = { id: nextId++, name, message, replies: [] };
    posts.push(newPost);
    res.json(newPost);
});

app.post('/reply-thread', (req, res) => {
    const { parentId, message } = req.body;
    const thread = posts.find(p => p.id === parseInt(parentId));
    if (thread) {
        const reply = { id: nextId++, name: '返信者', message };
        thread.replies.push(reply);
        res.json(reply);
    } else {
        res.status(404).json({ error: 'Thread not found' });
    }
});

/* 📌 投票機能 */
app.post('/post-vote', (req, res) => {
    const { name, message } = req.body;
    const newPost = { id: nextId++, name, message, votes: 0 };
    posts.push(newPost);
    res.json(newPost);
});

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

/* 📌 匿名モード付き投稿 */
app.post('/post-anonymous', (req, res) => {
    const { name, message } = req.body;
    const newPost = { id: nextId++, name, message };
    posts.push(newPost);
    res.json(newPost);
});

/* 📌 サーバー起動 */
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});

