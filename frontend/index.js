(async function () {
  window.ws = await connectToServer();

  //   window.ws.onmessage = (webSocketMessage) => {
  //     console.log("MESSAGE", webSocketMessage);
  //     // const messageBody = JSON.parse(webSocketMessage.data);
  //     // const cursor = getOrCreateCursorFor(messageBody);
  //     // cursor.style.transform = `translate(${messageBody.x}px, ${messageBody.y}px)`;
  //   };

  async function connectToServer() {
    let url = location.host;
    let prefix = location.protocol == "http:" ? "ws" : "wss";
    console.log("URL_WEBSOCKET", `${prefix}://${url}`);
    const ws = new WebSocket(`${prefix}://${url}`);
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
