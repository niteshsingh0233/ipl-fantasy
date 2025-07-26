import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:6969");
const SocketPage = () => {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [bid, setBid] = useState(0);

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [room]);

  const sendMessage = (message) => {
    socket.emit("sendMessage", { room, message });
  };

  const Bid = () => {
    setBid(bid + 1);
    socket.emit("sendMessage", { room, message: `Bid increased to ${bid + 1}` });
  }

  return (
    <div>
      <h1>Socket Room: {room}</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h2></h2>
      <button onClick={() => sendMessage("Hello from client!")}>Send Message</button>
      <button onClick={() => Bid()}>Bid button</button>
    </div>
  );
};

export default SocketPage;