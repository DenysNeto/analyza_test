(async function () {
  window.ws = await connectToServer();

  //   window.ws.onmessage = (webSocketMessage) => {
  //     console.log("MESSAGE", webSocketMessage);
  //     // const messageBody = JSON.parse(webSocketMessage.data);
  //     // const cursor = getOrCreateCursorFor(messageBody);
  //     // cursor.style.transform = `translate(${messageBody.x}px, ${messageBody.y}px)`;
  //   };

  async function connectToServer() {
    const ws = new WebSocket("ws://localhost:4020/ws");
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer);
          resolve(ws);
        }
      }, 10);
    });
  }
})();
