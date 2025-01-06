"use strict";

// 📌 匿名モード付き投稿機能
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const isAnonymous = document.querySelector('#anonymous').checked; // 匿名モードON/OFF

    const params = {
        method: "POST",
        body: `name=${encodeURIComponent(isAnonymous ? '匿名さん' : name)}&message=${encodeURIComponent(message)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    fetch('/post-anonymous', params)
        .then(response => response.json())
        .then(data => {
            renderAnonymousPost(data);
        });
});

// 📌 投稿を画面に表示
function renderAnonymousPost(data) {
    const bbs = document.querySelector('#bbs');
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        <strong>${data.name}</strong>: ${data.message}
    `;
    bbs.appendChild(post);
}
