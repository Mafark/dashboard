var createSocket = function(url, message, onMessage) {
  var socket;
  var connected = false;

  typeof WebSocket !== 'undefined' &&
    (function connect() {
      socket = new WebSocket(url);
      socket.onmessage = onMessage;
      socket.onopen = () => {
        connected = true;
        setInterval(function() {
          socket.send('{ "command": "' + message + '" }');
        }, 1000);
      };
      socket.onerror = err => {
        console.error(err);
        socket.onclose = null;
        connected = false;
        socket.close();
        connect();
      };
      socket.onclose = event => {
        console.info(`WebSocket closed with code ${event.code}! ${event.reason}`);
        connected = false;
        if (event.wasClean) return;
        connect();
      };
    })();
};
