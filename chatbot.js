(function (global) {
  function Chatbot(options) {
      this.options = options || {};
      this.chatbotContainer = null;
      this.toggleButton = null;
      this.init();
  }

  Chatbot.prototype.init = function () {
      this.createChatbotElements();
      this.bindEvents();
      this.displayInitialMessage();
      this.applyCustomStyles();
  };

  Chatbot.prototype.createChatbotElements = function () {
      // Create main chatbot container
      this.chatbotContainer = document.createElement('div');
      this.chatbotContainer.id = 'chatbot';
      this.chatbotContainer.innerHTML = `
          <div id="chatbot-header">
              <h2>Chatbot</h2>
              <span id="close-btn">&times;</span>
          </div>
          <div id="chatbot-messages"></div>
          <div id="chatbot-input">
              <input type="text" id="user-input" placeholder="Type your message...">
              <button id="send-btn">Send</button>
          </div>
      `;
      document.body.appendChild(this.chatbotContainer);

      // Create toggle button
      this.toggleButton = document.createElement('button');
      this.toggleButton.id = 'chatbot-toggle';
      this.toggleButton.textContent = 'Chat';
      document.body.appendChild(this.toggleButton);
  };

  Chatbot.prototype.bindEvents = function () {
      const chatbot = this;
      const closeBtn = this.chatbotContainer.querySelector('#close-btn');
      const sendBtn = this.chatbotContainer.querySelector('#send-btn');
      const userInput = this.chatbotContainer.querySelector('#user-input');
      const chatbotMessages = this.chatbotContainer.querySelector('#chatbot-messages');

      this.toggleButton.addEventListener('click', function () {
          chatbot.chatbotContainer.style.display = 'flex';
          chatbot.toggleButton.style.display = 'none';
      });

      closeBtn.addEventListener('click', function () {
          chatbot.chatbotContainer.style.display = 'none';
          chatbot.toggleButton.style.display = 'block';
      });

      sendBtn.addEventListener('click', function () {
          chatbot.sendMessage(userInput, chatbotMessages);
      });

      userInput.addEventListener('keypress', function (e) {
          if (e.key === 'Enter') {
              chatbot.sendMessage(userInput, chatbotMessages);
          }
      });
  };

  Chatbot.prototype.displayInitialMessage = function () {
      if (this.options.initialMessage) {
          const chatbotMessages = this.chatbotContainer.querySelector('#chatbot-messages');
          this.addMessage('bot', this.options.initialMessage, chatbotMessages);
      }
  };

  Chatbot.prototype.sendMessage = function (userInput, chatbotMessages) {
      const message = userInput.value.trim();
      if (message) {
          this.addMessage('user', message, chatbotMessages);
          userInput.value = '';
          setTimeout(() => {
              this.addMessage('bot', this.getBotResponse(message), chatbotMessages);
          }, 500);
      }
  };

  Chatbot.prototype.addMessage = function (sender, message, chatbotMessages) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', sender);
      messageElement.textContent = message;
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  Chatbot.prototype.getBotResponse = function (message) {
      // Use custom responses if provided
      const responses = this.options.botResponses || {};
      return responses[message] || "Sorry, I didn't understand that.";
      // return responses[message.toLowerCase()] || "Sorry, I didn't understand that.";
  };

  Chatbot.prototype.applyCustomStyles = function () {
      if (this.options.themeColor) {
          const header = this.chatbotContainer.querySelector('#chatbot-header');
          const sendBtn = this.chatbotContainer.querySelector('#send-btn');
          const toggleBtn = this.toggleButton;

          header.style.backgroundColor = this.options.themeColor;
          sendBtn.style.backgroundColor = this.options.themeColor;
          toggleBtn.style.backgroundColor = this.options.themeColor;
      }
  };

  // Expose the Chatbot module to the global object
  global.Chatbot = Chatbot;
})(window);
