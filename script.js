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
    messageElement.innerHTML = `<p>${text}</p><span class="message-sender">${nickname}</span>`;
    return messageElement;
}

function saveMessage(nickname, message) {
    console.log(`Saving message: ${nickname} - ${message}`);
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
