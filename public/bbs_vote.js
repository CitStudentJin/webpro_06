"use strict";

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    fetch('/post-vote', {
        method: "POST",
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(data => {
        const bbs = document.querySelector('#bbs');
        const post = document.createElement('div');
        post.id = `post-${data.id}`;
        post.innerHTML = `<strong>${data.name}</strong>: ${data.message}
            <button onclick="vote(${data.id})">👍 ${data.votes}</button>`;
        bbs.appendChild(post);
    });
});

function vote(id) {
    fetch('/vote', {
        method: "POST",
        body: `id=${id}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(data => {
        const post = document.querySelector(`#post-${id}`);
        post.querySelector('button').innerText = `👍 ${data.votes}`;
    });
}
