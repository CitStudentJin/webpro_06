"use strict";

// 📌 スレッド返信機能
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    fetch('/post-thread', params)
        .then(response => response.json())
        .then(data => {
            renderThread(data);
        });
});

function renderThread(data) {
    const bbs = document.querySelector('#bbs');
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        <strong>${data.name}</strong>: ${data.message}
        <button onclick="reply(${data.id})">返信</button>
        <div id="thread-${data.id}" class="thread"></div>
    `;
    bbs.appendChild(post);
}

function reply(id) {
    const replyMessage = prompt('返信内容を入力:');
    if (replyMessage) {
        const params = {
            method: "POST",
            body: `parentId=${id}&message=${encodeURIComponent(replyMessage)}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        fetch('/reply-thread', params)
            .then(response => response.json())
            .then(data => {
                const thread = document.querySelector(`#thread-${id}`);
                const replyDiv = document.createElement('div');
                replyDiv.className = 'reply';
                replyDiv.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
                thread.appendChild(replyDiv);
            });
    }
}
