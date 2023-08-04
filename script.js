const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const nicknameInput = document.getElementById('nickname-input');
const chatContainer = document.getElementById('chat');

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = messageInput.value.trim();
    const nickname = nicknameInput.value.trim();
    
    if (message !== '' && nickname !== '') {
        addMessage(nickname, message);
        saveMessage(nickname, message);
        messageInput.value = '';
    }
});

function addMessage(nickname, text) {
    const messageElement = createMessageElement(nickname, text);
    chatContainer.appendChild(messageElement);
    cleanUpChat();
}

function createMessageElement(nickname, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', (nickname === getSavedNickname()) ? 'outgoing' : 'incoming');
    messageElement.innerHTML = `<p><strong>${nickname}:</strong> ${text}</p>`;
    return messageElement;
}

function saveMessage(nickname, message) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: nickname,
            body: message,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function getMessagesFromServer() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((json) => {
        const nickname = json.title;
        const message = json.body;
        addMessage(nickname, message);
    });
}

function cleanUpChat() {
    const messages = chatContainer.getElementsByClassName('message');
    if (messages.length > 8) {
        chatContainer.removeChild(messages[0]);
    }
}

function getSavedNickname() {
    const savedNickname = localStorage.getItem('nickname');
    return savedNickname || '';
}

function setSavedNickname(nickname) {
    localStorage.setItem('nickname', nickname);
}

nicknameInput.value = getSavedNickname();
