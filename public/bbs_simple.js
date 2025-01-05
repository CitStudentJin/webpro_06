"use strict";

// 📌 シンプル投稿機能
document.querySelector('#send').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    if (name && message) {
        const newMessage = document.createElement('div');
        newMessage.textContent = `${name}: ${message}`;
        document.querySelector('#bbs').appendChild(newMessage);

        // 入力フィールドをクリア
        document.querySelector('#name').value = '';
        document.querySelector('#message').value = '';
    }
});
