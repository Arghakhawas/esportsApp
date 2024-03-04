import React, { useState, useEffect } from 'react';
import TournamentForm from './TournamentForm';
import { useNavigate } from 'react-router-dom';
import './Tournament.css';
import TournamentRules from './TournamentRules/TournamentRules';
// import efootball from '../assets/efootball.png';
// import efootball1 from '../assets/efootball1.jpg';
// import ffgarena from '../assets/ffgarena.jpg';
// import bgmi from '../assets/bgmi.png';
// import cod from '../assets/cod.jpg';
import TournamentCreationForm from './TournamentRules/TournamentCreationForm';

const Tournament = () => {
  const [showRules, setShowRules] = useState(false);
  const [showCreationForm, setShowCreationForm] = useState(false);
  const [rulesToDisplay, setRulesToDisplay] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedGameCategory, setSelectedGameCategory] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tournaments data when the component mounts
    const fetchTournaments = async () => {
      try {
        const response = await fetch('https://esportsappbackend.onrender.com/api/tournament');
        if (response.ok) {
          const tournamentsData = await response.json();
          setTournaments(tournamentsData);
        } else {
          // Handle error response
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleCreateTournament = async (tournamentData) => {
    try {
      const response = await fetch('https://esportsappbackend.onrender.com/api/tournament/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(tournamentData),
      });
  
      if (response.ok) {
        const newTournament = await response.json();
        setTournaments((prevTournaments) => [...prevTournaments, newTournament]);
        setShowCreationForm(false);
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
    }
  };
  

  const handleJoinClick = (tournament) => {
    setSelectedTournament(tournament);
    setStep(2); // Move to step 2 (join form)
  };

  const handleViewRulesClick = (rules) => {
    setRulesToDisplay(rules);
    setShowRules(true);
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
        setStep(2);
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

  const filteredTournaments = selectedGameCategory
    ? tournaments.filter((tournament) => tournament.category.includes(selectedGameCategory))
    : tournaments;

  return (
    <div className="tournament-container">
      <h2>Tournaments</h2>
      <div className="game-categories">
        <button onClick={() => setShowCreationForm(true)}>Create Tournament</button>
        {showCreationForm && <TournamentCreationForm onSubmit={handleCreateTournament} />}
        <button className="btnall" onClick={() => setSelectedGameCategory('EA Football')}>
          EA Football
        </button>
        <button className="btnall" onClick={() => setSelectedGameCategory('FreeFire')}>
          FreeFire
        </button>
        <button className="btnall" onClick={() => setSelectedGameCategory('BGMI')}>
          BGMI
        </button>
        <button className="btnall" onClick={() => setSelectedGameCategory('COD')}>
          Call of Duty
        </button>
      </div>
      <div className="tournament-list">
        {filteredTournaments.map((tournament, index) => (
          <div className="tournament-box" key={index}>
            <h3>{tournament.category}</h3>
            <img className="tournament-box-img" src={tournament.image} alt={`${tournament.category} Image`} />

            <p>Prize Money: {tournament.prize}</p>
            <p>Joining Fee: {tournament.joiningFee}</p>
            <button onClick={() => handleJoinClick(tournament)}>Join Tournament</button>
            <button onClick={() => handleViewRulesClick(tournament.rules)}>View Game Rules</button>
          </div>
        ))}
        {showRules && (
          <TournamentRules className="top-rules-container" rules={rulesToDisplay} onClose={() => setShowRules(false)} />
        )}
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
            <p>Thank you for participating. Please check Tournament Information for fixtures and knockout stages.</p>
            <button onClick={handlePaymentSuccessClose}>Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournament;
