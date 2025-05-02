// File: FantasyLandingPage.jsx
import React, { useEffect, useState } from "react";

function FadeInWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease-in-out",
      backgroundColor: "#111",
      minHeight: "100vh",
      color: "#fff",
      padding: "2rem"
    }}>
      {children}
    </div>
  );
}

export default FadeInWrapper