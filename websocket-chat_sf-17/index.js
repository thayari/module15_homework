class Chat {
  constructor() {
    this.messagesEl = document.querySelector('.messages');
    this.inputEl = document.querySelector('.input');
    this.sendBtnEl = document.querySelector('.send-btn');
    this.geolocationBtn = document.querySelector('.geolocation-btn');
  }

  send = () => {
    let message = {
      author: "user",
      text: this.inputEl.value,
    };
    this.showNewMessage(message);
    this.websocket.send(message.text);
    this.inputEl.value = '';
  }

  geolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let link = `<a href="https://www.openstreetmap.org/#map=15/${position.coords.latitude}/${position.coords.longitude}" target="_blank">https://www.openstreetmap.org/#map=15/${position.coords.latitude}/${position.coords.longitude}</a>`;
        this.showNewMessage({author: 'system', text: link});
      });
      
    } else {
      this.showNewMessage({author: 'system', text: 'Геолокация недоступна.'});
    }
  }

  showNewMessage(message) {
    let html = `<div class="message ${message.author}-message">${message.text}</div>`;
    this.messagesEl.insertAdjacentHTML('beforeend', html);
  }

  addListeners() {
    this.sendBtnEl.addEventListener('click', this.send);
    this.geolocationBtn.addEventListener('click', this.geolocation);
  }

  openWebsocket() {
    const wsUri = "wss://ws.postman-echo.com/raw";

    this.websocket = new WebSocket(wsUri);
    
    this.websocket.onmessage = (evt) => {
      let message = {
        author: "echo",
        text: evt.data,
      };
      this.showNewMessage(message);
    };
    this.websocket.onerror = function(evt) {
      console.error('ERROR: ' + evt.data);
    };
  }

  init() {
    this.addListeners();
    this.openWebsocket();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const chat = new Chat();
  chat.init();
});

