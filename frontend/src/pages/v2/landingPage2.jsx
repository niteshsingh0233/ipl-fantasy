// File: FantasyLandingPage.jsx
import React from "react";

export default function FantasyLandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111", color: "#fff", fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <header style={{ backgroundColor: "#1a1a1a", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>LeagueForge</div>
        <nav>
          <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 }}>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Home</a></li>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Game Modes</a></li>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none" }}>How It Works</a></li>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>Build Your Dream Fantasy League</h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
          Play fantasy match and series games. Create your own rules, auction players, and join custom contests like never before!
        </p>
        <button style={{ backgroundColor: "#6366f1", color: "white", padding: "0.75rem 1.5rem", borderRadius: "9999px", fontSize: "1.125rem", border: "none", cursor: "pointer" }}>
          Get Started
        </button>
      </section>

      {/* Game Modes */}
      <section style={{ padding: "4rem 1rem", backgroundColor: "#2d2d2d", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "2rem" }}>Game Modes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ backgroundColor: "#444", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Match Games</h3>
            <p>Join contests for individual matches. Compete against others and climb the leaderboard.</p>
          </div>
          <div style={{ backgroundColor: "#444", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Series Games with Auctions</h3>
            <p>Create or join custom series, conduct player auctions like IPL, and battle through the entire season!</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "2rem" }}>How It Works</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ backgroundColor: "#333", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>1. Create or Join</h4>
            <p>Enter a match or series game. Invite friends or join public contests.</p>
          </div>
          <div style={{ backgroundColor: "#333", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>2. Set Rules</h4>
            <p>Customize point systems and rules for your series games.</p>
          </div>
          <div style={{ backgroundColor: "#333", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>3. Auction Players</h4>
            <p>Host your own IPL-style player auctions. Build your team. Play. Win.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: "5rem 1rem", backgroundColor: "#4f46e5", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Ready to Build Your Fantasy Empire?</h2>
        <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>Create leagues, auction players, and challenge friends now!</p>
        <button style={{ backgroundColor: "white", color: "#4f46e5", padding: "0.75rem 1.5rem", borderRadius: "9999px", fontSize: "1rem", fontWeight: "600", border: "none", cursor: "pointer" }}>
          Start Playing
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: "1.5rem", textAlign: "center", color: "#ccc", fontSize: "0.875rem" }}>
        &copy; {new Date().getFullYear()} LeagueForge. All rights reserved.
      </footer>
    </div>
  );
}
