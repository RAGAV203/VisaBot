const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

let previousMessages = [];

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = messageInput.value;

  if (message.trim() === '') {
    return;
  }

  // Send the message to the server
  const response = await fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  // Add the message to the previous messages array
  previousMessages.push({
    message,
    timestamp: new Date(),
  });

  // Render the message in the chat
  renderMessage(data.message, 'outgoing');
  messageInput.value = '';
});

// Scroll to the bottom of the chat when the page loads
messagesContainer.scrollTop = messagesContainer.scrollHeight;

// Render the previous messages in the chat
previousMessages.forEach((message) => {
  renderMessage(message.message, 'incoming', message.timestamp);
});

function renderMessage(message, messageType, timestamp = new Date()) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', messageType);

  const timestampElement = document.createElement('div');
  timestampElement.classList.add('timestamp');
  timestampElement.textContent = formatDate(timestamp);

  const bubbleElement = document.createElement('div');
  bubbleElement.classList.add('bubble');
  bubbleElement.textContent = message;

  messageElement.appendChild(timestampElement);
  messageElement.appendChild(bubbleElement);
  messagesContainer.appendChild(messageElement);

  // Scroll to the bottom of the chat when a new message is added
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatDate(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

