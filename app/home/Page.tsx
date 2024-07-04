import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Fastest & Easiest Way to Buy Game Credits</h1>
      </header>
      <section className="games-list">
        <h2>Popular Games</h2>
        <div className="game-card">
          <Link to="/topup/mobile-legends">
            <img src="/images/mobile-legends.jpg" alt="Mobile Legends" />
            <p>Mobile Legends</p>
          </Link>
        </div>
        <div className="game-card">
          <Link to="/topup/pubg-mobile">
            <img src="/images/pubg-mobile.jpg" alt="PUBG Mobile" />
            <p>PUBG Mobile</p>
          </Link>
        </div>
        {/* Add more games similarly */}
      </section>
    </div>
  );
};

export default HomePage;