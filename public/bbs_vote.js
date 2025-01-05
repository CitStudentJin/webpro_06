"use strict";

// 📌 投稿機能（投票用BBS）
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    fetch('/post-vote', params)
        .then(response => response.json())
        .then(data => {
            renderPostWithVote(data);
        });
});

// 📌 投稿を画面に表示する関数
function renderPostWithVote(data) {
    const bbs = document.querySelector('#bbs');
    const post = document.createElement('div');
    post.id = `post-${data.id}`;
    post.className = 'post';
    post.innerHTML = `
        <strong>${data.name}</strong>: ${data.message}
        <button onclick="vote(${data.id})">👍 ${data.votes}</button>
    `;
    bbs.appendChild(post);
}

// 📌 投票機能
function vote(id) {
    const params = {
        method: "POST",
        body: `id=${id}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    fetch('/vote', params)
        .then(response => response.json())
        .then(data => {
            const post = document.querySelector(`#post-${id}`);
            post.querySelector('button').innerText = `👍 ${data.votes}`;
        });
}
