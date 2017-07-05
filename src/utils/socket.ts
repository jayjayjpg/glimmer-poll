// import * as io from 'socket.io-client'; // too much pain...

export default function createSocket (options) {
  const socket = new WebSocket(options.url);

  socket.onopen = () => {
    console.log("connection opened!");
  };

  socket.onerror = (err) => {
    console.log("CONNECTION ERROR");
  };

  return socket;
}
