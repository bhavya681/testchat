// Injecting CSS into the document head
const style = document.createElement('style');
style.innerHTML = `
  /* Your CSS code here, same as before */
  :root {
    --primary-color: #286efa;
    --text-color: #333;
    --background-color: #fff;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --message-bg: #f0f0f0;
    --input-bg: #fff;
  }

  .chatbot-dark-theme {
    --primary-color: #4a90e2;
    --text-color: #f0f0f0;
    --background-color: #2c2c2c;
    --shadow-color: rgba(255, 255, 255, 0.1);
    --message-bg: #3a3a3a;
    --input-bg: #444;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
  }

  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .chatbot-toggle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 24px;
    box-shadow: 0 4px 8px var(--shadow-color);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chatbot-toggle:hover {
    transform: scale(1.05);
  }

  .chatbot-interface {
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 350px;
    height: 550px;
    background-color: var(--background-color);
    border-radius: 10px;
    box-shadow: 0 0 20px var(--shadow-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;
  }

  .chatbot-interface.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }

  .chatbot-header {
    background-color: black;
    color: white;
    padding: 15px;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-buttons button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    transition: color 0.3s;
  }

  .chat-messages {
    flex-grow: 1;
    padding: 15px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .chat-messages::-webkit-scrollbar {
    display: none;
  }

  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 18px;
    max-width: 80%;
    animation: bubbleUp 0.5s ease-out;
    transition: transform 0.3s;
  }

  @keyframes bubbleUp {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .message:hover {
    transform: scale(1.05);
  }

  .bot-message {
    background-color: var(--message-bg);
    color: var(--text-color);
    align-self: flex-start;
  }

  .user-message {
    background-color: var(--primary-color);
    color: white;
    align-self: flex-end;
    margin-left: auto;
  }

  .suggested-messages {
    display: flex;
    gap: 10px;
    min-height: 30px;
    margin-bottom: 10px;
    overflow-x: scroll;
    white-space: nowrap;
    scroll-behavior: smooth;
  }

  .suggested-messages::-webkit-scrollbar {
    display: none;
  }

  .suggested-message {
    background-color: var(--message-bg);
    border: none;
    border-radius: 18px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    white-space: nowrap;
    color: var(--text-color);
  }

  .suggested-message:hover {
    background-color: var(--primary-color);
    color: white;
  }

  .chat-input {
    display: flex;
    padding: 15px;
    border-top: 1px solid var(--message-bg);
  }

  .chat-input input {
    flex-grow: 1;
    border: 1px solid black;
    padding: 10px;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 14px;
    background-color: var(--input-bg);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
  }

  .chat-input button {
    background-color: black;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 10px;
    width: 44px;
    height: 44px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chat-input button:hover {
    transform: scale(1.1) rotate(10deg);
    background-color: #1c4fd8;
  }

  .chat-input button:active {
    transform: scale(0.9);
  }

  .chat-input button i {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  @media (max-width: 480px) {
    .chatbot-interface {
      width: 100%;
      height: 100%;
      bottom: 0;
      right: 0;
      border-radius: 0;
    }
  }
`;
document.head.appendChild(style);

// Create the chatbot container
const chatbotContainer = document.createElement('div');
chatbotContainer.className = 'chatbot-container';
document.body.appendChild(chatbotContainer);

// Create the toggle button
const chatbotToggle = document.createElement('button');
chatbotToggle.id = 'chatbot-toggle';
chatbotToggle.className = 'chatbot-toggle';
chatbotToggle.innerHTML = '💬';
chatbotContainer.appendChild(chatbotToggle);

// Create the chatbot interface
const chatbotInterface = document.createElement('div');
chatbotInterface.id = 'chatbot-interface';
chatbotInterface.className = 'chatbot-interface';
chatbotContainer.appendChild(chatbotInterface);

// Create the chatbot header
const chatbotHeader = document.createElement('div');
chatbotHeader.className = 'chatbot-header';
chatbotHeader.innerHTML = `
  <span>Chat with us</span>
  <div class="header-buttons">
    <button id="restart-chat" title="Restart Chat">↻</button>
    <button id="theme-toggle" title="Toggle Theme">🌙</button>
    <button id="close-chat" title="Close Chat">&times;</button>
  </div>
`;
chatbotInterface.appendChild(chatbotHeader);

// Create the chat messages container
const chatMessages = document.createElement('div');
chatMessages.id = 'chat-messages';
chatMessages.className = 'chat-messages';
chatbotInterface.appendChild(chatMessages);

// Create the suggested messages container
const suggestedMessages = document.createElement('div');
suggestedMessages.className = 'suggested-messages';
suggestedMessages.innerHTML = `
  <button class="suggested-message">How can you help me?</button>
  <button class="suggested-message">Tell me about your services</button>
  <button class="suggested-message">I have a question</button>
`;
chatbotInterface.appendChild(suggestedMessages);

// Create the chat input container
const chatInput = document.createElement('div');
chatInput.className = 'chat-input';
chatInput.innerHTML = `
  <input type="text" id="user-input" placeholder="Type your message..." />
  <button id="send-message">➤</button>
`;
chatbotInterface.appendChild(chatInput);

// JavaScript functionality
const closeChat = document.getElementById("close-chat");
const themeToggle = document.getElementById("theme-toggle");
const restartChat = document.getElementById("restart-chat");
const sendMessageBtn = document.getElementById("send-message");
const userInput = document.getElementById("user-input");

chatbotToggle.addEventListener("click", () => {
  chatbotInterface.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
  chatbotInterface.classList.remove("active");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("chatbot-dark-theme");
});

restartChat.addEventListener("click", () => {
  chatMessages.innerHTML = ""; // Clear chat messages
  userInput.value = ""; // Clear input field
});

// Function to send a message
function sendMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

// Send message when button is clicked
sendMessageBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    sendMessage(message, "user");
    userInput.value = "";
    // Simulate bot response
    setTimeout(() => {
      sendMessage("This is a simulated response.", "bot");
    }, 1000);
  }
});

// Send message when Enter key is pressed
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessageBtn.click();
  }
});

// Handle suggested messages
suggestedMessages.querySelectorAll(".suggested-message").forEach((button) => {
  button.addEventListener("click", () => {
    const suggestion = button.textContent;
    sendMessage(suggestion, "user");
    // Simulate bot response
    setTimeout(() => {
      sendMessage("This is a simulated response.", "bot");
    }, 1000);
  });
});
