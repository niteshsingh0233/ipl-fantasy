// File: FantasyLandingPage.jsx
import React from "react";
import "./LandingPage.css"; // <-- Add this CSS file manually
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function FantasyLandingPage() {

    useEffect(() => {
         document.title = "Home - SeriesX"
      }, []);
   

  return (
    <div className="landing-page">


      <header style={{ backgroundColor: "#1a1a1a", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333" }}>
        <a href="#" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", textDecoration: "none" }}>SeriesX</a>
        <nav>
          <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0 }}>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Home</a></li>
            <li><a href="#gameModes" style={{ color: "#ccc", textDecoration: "none" }}>Game Modes</a></li>
            <li><a href="#howItWorks" style={{ color: "#ccc", textDecoration: "none" }}>How It Works</a></li>
            <li><a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Build Your Dream Fantasy League</h1>
        <p>
          Play fantasy match and series games. Create your own rules, auction players, and join custom contests like never before!
        </p>
        <button>Get Started</button>
      </section>

      {/* Game Modes */}
      <section className="game-modes" id="gameModes">
        <h2>Game Modes</h2>
        <div className="cards">
          <div className="card">
            <h3>Match Games</h3>
            <p>Join contests for individual matches. Compete against others and climb the leaderboard.</p>
          </div>
          <div className="card">
            <h3>Series Games with Auctions</h3>
            <p>Create or join custom series, conduct player auctions like IPL, and battle through the entire season!</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="howItWorks">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h4>1. Create or Join</h4>
            <p>Enter a match or series game. Invite friends or join public contests.</p>
          </div>
          <div className="step">
            <h4>2. Set Rules</h4>
            <p>Customize point systems and rules for your series games.</p>
          </div>
          <div className="step">
            <h4>3. Auction Players</h4>
            <p>Host your own IPL-style player auctions. Build your team. Play. Win.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Build Your Fantasy Empire?</h2>
        <p>Create leagues, auction players, and challenge friends now!</p>
        <button>Start Playing</button>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2rem 1rem", textAlign: "center", color: "#ccc", fontSize: "0.875rem" }}>
        <p>&copy; {new Date().getFullYear()} SeriesXFantasyApp. All rights reserved.</p>
        <div style={{ marginTop: "1rem" }}>
        <Link to="/privacy" style={{ color: "#888", margin: "0 1rem" }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: "#888", margin: "0 1rem" }}>Terms & Conditions</Link>
          <Link to="/contact" style={{ color: "#888", margin: "0 1rem" }}>Contact Us</Link>
        </div>
      </footer>

      {/* Privacy Policy Page */}
      {/* Terms and Contact would normally be separate routes, here they're simplified */}
      <section id="privacy" style={{ display: "none" }}>
        <h2>Privacy Policy</h2>
        <p>We value your privacy. Your personal information is protected and never shared without consent.</p>
      </section>

      <section id="terms" style={{ display: "none" }}>
        <h2>Terms and Conditions</h2>
        <p>By using LeagueForge, you agree to abide by our platform's fair use and competition rules.</p>
      </section>

      <section id="contact" style={{ display: "none" }}>
        <h2>Contact Us</h2>
        <p>Email: support@leagueforge.com</p>
        <p>Phone: +1 (800) 123-4567</p>
      </section>
    </div>
  );
}
