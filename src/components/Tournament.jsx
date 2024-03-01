import React, { useState } from 'react';
import TournamentForm from './TournamentForm';
import { useNavigate } from 'react-router-dom';
import './Tournament.css';
import TournamentRules from './TournamentRules/TournamentRules';
import efootball from "../assets/efootball.png";
import efootball1 from "../assets/efootball1.jpg";
import ffgarena from "../assets/ffgarena.jpg";
import bgmi from "../assets/bgmi.png";
import cod from "../assets/cod.jpg"

const Tournament = () => {
  const [showRules, setShowRules] = useState(false);
  const [rulesToDisplay, setRulesToDisplay] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedGameCategory, setSelectedGameCategory] = useState(null);
  const navigate = useNavigate();

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

  const tournaments = [
    {
      category: 'EA Football 2024 - Knockout',
      prize: '₹200',
      joiningFee: '₹15',
      Player: 'Single',
      rules: [
        'Tournament will be in knockout mode.',
        'Only one game will be played against an opponent in a round (There will be no home and away matches).',
        'Participants must schedule the matches with their opponents only within the specified timeline.',
        'If any player is not ready for the match before the deadline, then the opposition will be called the winner.',
        'After every match, the player who won should send a screenshot to the group with the caption "won vs @mention(opposite player)".',
        'The decision of the Organising core and Convenors will stand final.',
        'Match Time: 8 min. Extra Time: On PK: On',
        'No. 5 +1 Sub in Extra Time',
        'Disconnections and technical problems: In the event of a tie break caused by a technical problem after the first umpire signal has been given, the match shall be replayed. In the absence of mutual agreement to replay a match, a new match shall be played with conditions recreated close to the time of the previous match stoppage. Conditions may be the number of goals, red cards, etc. and shall be determined by an administrator.',
        'Player behaviour: All players are required to maintain and observe a certain level of sportsmanship. Any unsportsmanlike conduct, which may include but is not limited to racism, rude/violent actions, offensive remarks, and disrespect to the admin team will not be tolerated. Participants who do not meet these requirements are subject to penalties ranging from forfeiting a game, forfeit and suspension of the player in question, or other penalties deemed necessary by the organizers.',
      ],
      image: efootball,
    },
    {
      category: 'EA Football 2024 - Group Stages Cup',
      prize: '₹1000',
      joiningFee: '₹50',
      Player:'Single',
      rules: [
        'Tournament will be in knockout mode.',
        'Only one game will be played against an opponent in a round (There will be no home and away matches).',
        'Participants must schedule the matches with their opponents only within the specified timeline.',
        'If any player is not ready for the match before the deadline, then the opposition will be called the winner.',
        'After every match, the player who won should send a screenshot to the group with the caption "won vs @mention(opposite player)".',
        'The decision of the Organising core and Convenors will stand final.',
        'Match Time: 8 min. Extra Time: On PK: On',
        'No. 5 +1 Sub in Extra Time',
        'Disconnections and technical problems: In the event of a tie break caused by a technical problem after the first umpire signal has been given, the match shall be replayed. In the absence of mutual agreement to replay a match, a new match shall be played with conditions recreated close to the time of the previous match stoppage. Conditions may be the number of goals, red cards, etc. and shall be determined by an administrator.',
        'Player behaviour: All players are required to maintain and observe a certain level of sportsmanship. Any unsportsmanlike conduct, which may include but is not limited to racism, rude/violent actions, offensive remarks, and disrespect to the admin team will not be tolerated. Participants who do not meet these requirements are subject to penalties ranging from forfeiting a game, forfeit and suspension of the player in question, or other penalties deemed necessary by the organizers.',
      ],
      image: efootball1, 
    },
    {
      category: 'EA Football 2024 - Single Match',
      prize: '₹97',
      joiningFee: '₹50',
      Player:'Single',
      rules: [
        'Tournament will be in knockout mode.',
        'Only one game will be played against an opponent in a round (There will be no home and away matches).',
        'Participants must schedule the matches with their opponents only within the specified timeline.',
        'If any player is not ready for the match before the deadline, then the opposition will be called the winner.',
        'After every match, the player who won should send a screenshot to the group with the caption "won vs @mention(opposite player)".',
        'The decision of the Organising core and Convenors will stand final.',
        'Match Time: 8 min. Extra Time: On PK: On',
        'No. 5 +1 Sub in Extra Time',
        'Disconnections and technical problems: In the event of a tie break caused by a technical problem after the first umpire signal has been given, the match shall be replayed. In the absence of mutual agreement to replay a match, a new match shall be played with conditions recreated close to the time of the previous match stoppage. Conditions may be the number of goals, red cards, etc. and shall be determined by an administrator.',
        'Player behaviour: All players are required to maintain and observe a certain level of sportsmanship. Any unsportsmanlike conduct, which may include but is not limited to racism, rude/violent actions, offensive remarks, and disrespect to the admin team will not be tolerated. Participants who do not meet these requirements are subject to penalties ranging from forfeiting a game, forfeit and suspension of the player in question, or other penalties deemed necessary by the organizers.',
      ],
      image: efootball,
    },
    {
      category: 'FreeFire - Single - BR',
      prize: '₹200',
      joiningFee: '₹15',
      Player:'Single',
      rules: 'Game rules for BGMI Entry Fee ...',
      image: ffgarena, 
    },
    {
      category: 'FreeFire - Single BR  ',
      prize: '₹450',
      joiningFee: '₹25'
      , Player:'Single',
      rules: 'Game rules for BGMI Entry Fee ...',
      image: ffgarena, 
    },
    {
      category: 'FreeFire - Multiply BR',
      prize: '₹1000',
      Player:'Multiple',
      joiningFee: '₹50',
      rules: 'Game rules for BGMI Entry Fee ...',
      image: ffgarena, 
    },
    {
      category: 'FreeFire - Multiply Knockout  (4v4) - TDM Room',
      prize: '₹1000',
      joiningFee: '₹50',
      Player:'Multiple',
      rules: 'Game rules for Freefire Entry Fee ...',
      image: ffgarena, 
    },
    {
      category: 'FreeFire - Single match(4v4) - TDM Room',
      prize: '₹97',
      joiningFee: '₹50',
      rules: 'Game rules for Freefire Entry Fee ...',
      image: ffgarena, 
    },
    {
      category: 'BGMI - Knockout TDM',
      prize: '₹2000',
      joiningFee: '₹100',
      Player:'Multiple',
      rules: 'Game rules for BGMI Entry Fee ₹25...',
      image: bgmi, 
    },
    {
      category: 'BGMI - Battle Ground',
      prize: '₹400',
      joiningFee: '₹25',
      Player:'Multiple',
      rules: 'Game rules for BGMI Entry Fee ₹25...',
      image: bgmi, 
    },
    {
      category: 'BGMI - Tdm Single Match(5v5)',
      prize: '₹190',
      joiningFee: '₹100',
      Player:'Multiple',
      rules: 'Game rules for BGMI Entry Fee ₹25...',
      image: bgmi, 
    },
    {
      category: 'COD - Tdm Single Match(5v5)',
      prize: '₹195',
      Player:'Multiple',
      joiningFee: '₹100',
      rules: 'Game rules for BGMI Entry Fee ₹25...',
      image: cod, 
    },   {
      category: 'COD - Tdm knockout Single Match(5v5)',
      prize: '₹1000',
      joiningFee: '₹50',
      Player:'Multiple',
      rules: 'Game rules for BGMI Entry Fee ₹25...',
      image: cod, 
    },   {
      category: 'COD - Battle Ground Match',
      prize: '₹450',
      joiningFee: '₹25',
      Player:'Multiple',
      rules: 'Game rules for BGMI Entry Fee ₹25...',
      image: cod, 
    },
  ];


  const filteredTournaments = selectedGameCategory
    ? tournaments.filter((tournament) => tournament.category.includes(selectedGameCategory))
    : tournaments;

  return (
    <div className="tournament-container">
      <h2>Tournaments</h2>
      <div className="game-categories">
      
        <button className='btnall'  onClick={() => setSelectedGameCategory('EA Football')}>EA Football</button>
        <button className='btnall'  onClick={() => setSelectedGameCategory('FreeFire')}>FreeFire</button>
        <button className='btnall'  onClick={() => setSelectedGameCategory('BGMI')}>BGMI</button>
        <button className='btnall'  onClick={() => setSelectedGameCategory('COD')}>Call of Duty </button>
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
            <p>Thank you for participent.please  Tournament Informaition. Fixures and knock-stages </p>
            <button onClick={handlePaymentSuccessClose}>Go to Home</button>
          </div>
        </div>
      )}
  {showRules && (
        <TournamentRules
          rules={rulesToDisplay}
          onClose={() => setShowRules(false)}
        />
      )}
    </div>
  );
};
export default Tournament;
