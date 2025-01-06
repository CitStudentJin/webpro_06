"use strict";

document.querySelector('#send').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    fetch('/post-simple', {
        method: "POST",
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(data => {
        const bbs = document.querySelector('#bbs');
        const post = document.createElement('div');
        post.textContent = `${data.name}: ${data.message}`;
        bbs.appendChild(post);
    });
});
