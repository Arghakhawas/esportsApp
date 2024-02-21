import React, { useState } from 'react';
import TournamentForm from './TournamentForm';
import { useNavigate } from 'react-router-dom';
import './Tournament.css';
import efootball from "../assets/efootball.png";
const Tournament = () => {
  const [step, setStep] = useState(1);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedGameCategory, setSelectedGameCategory] = useState(null);
  const navigate = useNavigate();

  const handleJoinClick = (tournament) => {
    setSelectedTournament(tournament);
    setStep(2); // Move to step 2 (join form)
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('https://esportsappbackend.onrender.com/api/tournament/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(2); // Move to step 2 (payment)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      const response = await fetch('https://esportsappbackend.onrender.com/api/tournament/submitpayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  const handlePaymentSuccessClose = () => {
    setStep(1);
    setPaymentSuccess(false);
    navigate('/');
  };

  const tournaments = [
    {
      category: 'EA Football 2024 - Knockout',
      prize: '₹150',
      joiningFee: '₹10',
      rules: 'Game rules for EA Football Knockout...',
      image: efootball, // Add image path here
    },
    {
      category: 'EA Football 2024 - Group Stages Cup',
      prize: '₹1000',
      joiningFee: '₹50',
      rules: 'Game rules for EA Football Group Stages Cup...',
      image: '/assets/efootball1.jpg', // Add image path here
    },
    {
      category: 'FreeFire - Entry Fee ₹10',
      prize: '₹150',
      joiningFee: '₹10',
      rules: 'Game rules for BGMI Entry Fee ₹10...',
      image: 'dist/assets/ffgarena.jpg', // Add image path here
    },
    {
      category: 'BGMI - Entry Fee ₹25',
      prize: '₹400',
      joiningFee: '₹25',
      rules: 'Game rules for BGMI Entry Fee ₹25...',
      image: '/assets/bgmi.png', // Add image path here
    },
  ];

  // Filter tournaments based on selected game category
  const filteredTournaments = selectedGameCategory
    ? tournaments.filter((tournament) => tournament.category.includes(selectedGameCategory))
    : tournaments;

  return (
    <div className="tournament-container">
      <h2>Tournaments</h2>
      <div className="game-categories">
        <button className='btnall' onClick={() => setSelectedGameCategory(null)}>All Games</button>
        <button className='btnall'  onClick={() => setSelectedGameCategory('EA Football')}>EA Football</button>
        <button className='btnall'  onClick={() => setSelectedGameCategory('FreeFire')}>FreeFire</button>
        <button className='btnall'  onClick={() => setSelectedGameCategory('BGMI')}>BGMI</button>
        {/* Add more buttons for other game categories */}
      </div>
      <div className="tournament-list">
        {filteredTournaments.map((tournament, index) => (
          <div className="tournament-box" key={index}>
            <h3>{tournament.category}</h3>
            <img className=".tournament-box img" src={tournament.image} alt={`${tournament.category} Image`} />
            <p>Prize Money: {tournament.prize}</p>
            <p>Joining Fee: {tournament.joiningFee}</p>
            <button onClick={() => handleJoinClick(tournament)}>Join Tournament</button>
            <button onClick={() => alert(tournament.rules)}>View Game Rules</button>
          </div>
        ))}
      </div>
      {step === 2 && (
        <TournamentForm
          onSubmit={handleFormSubmit}
          onPaymentSubmit={handlePaymentSubmit}
          selectedTournament={selectedTournament}
          onClose={() => setStep(1)}
        />
      )}
      {paymentSuccess && (
        <div className="payment-success-message">
          <div className="payment-success-message-content">
            <h3>Payment successful!</h3>
            <p>Thank you for your payment.</p>
            <button onClick={handlePaymentSuccessClose}>Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournament;
