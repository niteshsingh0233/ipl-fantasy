import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("https://fantasy-app-chi.vercel.app");
const CricketBiddingPage = () => {

  const { room } = useParams();
  const [messages, setMessages] = useState([]);

  const [bidAmount, setBidAmount] = useState("");
  const [bidderName, setBidderName] = useState("");
  const [bids, setBids] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const audioRef = useRef(null);
  const confettiTriggered = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        else {
          clearInterval(timer);
          setAuctionEnded(true);
          if (!confettiTriggered.current) {
            triggerConfetti();
            confettiTriggered.current = true;
          }
          return 0;
        }
      });
    }, 1000);


    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
        socket.emit("joinRoom", room);
    
        // socket.on("receiveMessage", (message) => {
        //   setMessages((prevMessages) => [...prevMessages, message]);
        // });
    
        return () => {
          socket.off("receiveMessage");
        };
    }, [room]);


    useEffect(() => {
        socket.on("bidUpdate", (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);
    

  const handleBid = () => {
    if (auctionEnded || !bidderName || !bidAmount) return;

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) return;

    const newBid = {
      name: bidderName,
      amount: amount,
      time: new Date().toLocaleTimeString(),
      animate: true,
    };

    if (audioRef.current) audioRef.current.play();

    setBids([newBid, ...bids]);
    setBidAmount("");
    setBidderName("");

    socket.emit("sendMessage", { room, message: `${bidderName} placed a bid of ₹${amount}` });


    setTimeout(() => {
      setBids((prev) =>
        prev.map((b, i) => (i === 0 ? { ...b, animate: false } : b))
      );
    }, 1000);
  };

  

  const triggerConfetti = () => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  };

  const highestBid = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0;
  const highestBidder = bids.find(b => b.amount === highestBid);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const sendMessage = (message) => {
    socket.emit("sendMessage", { room, message });
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#121212", // Dark background
      color: "#e0e0e0", // Light text color
      maxWidth: "800px",
      margin: "20px auto",
      padding: 20,
      borderRadius: 10,
    },
    card: {
      background: "#1f1f1f", // Dark card background
      padding: 20,
      marginBottom: 20,
      borderRadius: 10,
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    },
    input: {
      padding: 10,
      margin: "5px 10px 10px 0",
      width: "calc(50% - 12px)",
      border: "1px solid #ccc",
      borderRadius: 6,
      backgroundColor: "#333",
      color: "#fff",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
    },
    ul: {
      listStyle: "none",
      padding: 0,
    },
    li: {
      padding: 10,
      borderBottom: "1px solid #444",
      backgroundColor: "#333",
    },
    animatedBid: {
      backgroundColor: "#444", // Slightly lighter for animation
      transition: "background-color 0.8s ease-in-out",
    },
    winnerBanner: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: 20,
      textAlign: "center",
      fontSize: "1.3em",
      borderRadius: 10,
    },
  };

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src="/bid-sound.mp3" preload="auto" />

      <div style={styles.card}>
        <h2>Cricket Player: Virat Kohli</h2>
        <p>Role: Batsman</p>
        <p>Base Price: ₹1 Cr</p>
      </div>

      <div style={styles.card}>
        <h3>⏳ Auction Ends In: {formatTime(timeLeft)}</h3>
        <h3>💰 Highest Bid: ₹{highestBid}</h3>
        <h3>🏆 Current Leader: {highestBidder ? highestBidder.name : "N/A"}</h3>
      </div>

      {!auctionEnded && (
        <div style={styles.card}>
          <h3>Place Your Bid</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={bidderName}
            onChange={(e) => setBidderName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Bid Amount (₹)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleBid}>Place Bid</button>
        </div>
      )}

      <div style={styles.card}>
        <h3>Live Leaderboard</h3>
        {bids.length === 0 ? (
          <p>No bids yet</p>
        ) : (
          <ul style={styles.ul}>
            {bids.map((bid, index) => (
              <li
                key={index}
                style={{
                  ...styles.li,
                  ...(bid.animate ? styles.animatedBid : {}),
                }}
              >
                {bid.name} - ₹{bid.amount} <span>({bid.time})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {auctionEnded && highestBidder && (
        <div style={styles.winnerBanner}>
          🎉 Auction Ended! Winner: <strong>{highestBidder.name}</strong> with ₹{highestBid}
        </div>
      )}
      

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage("Hello from client!")}>Send Message</button>
    </div>
  );
};

export default CricketBiddingPage;
