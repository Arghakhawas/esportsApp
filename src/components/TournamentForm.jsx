import React, { useState } from 'react';
import './TournamentForm.css';
import QRCode from 'react-qr-code';

const TournamentForm = ({ onSubmit, onPaymentSubmit, onClose, selectedTournament }) => {
  const [gameId, setGameId] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [utrNo, setUtrNo] = useState('');
  const [entryFee, setEntryFee] = useState(selectedTournament ? selectedTournament.joiningFee : '');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    player5: '',
    teamName: '',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const playerData = {
      gameId,
      userName,
      phoneNumber,
      ...formData,
    };

    try {
      await onSubmit(playerData);
      setStep(2); // Move to step 2 (payment)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    try {
      await onPaymentSubmit({ utrNo });
      // Close the form and show success message
      onClose();
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  const renderAdditionalInputs = () => {
    if (selectedTournament && selectedTournament.Player === 'Multiple') {
      return (
        <div>
          {/* Additional inputs for Multiply Player */}
          {[1, 2, 3, 4, 5].map((index) => (
            <label key={index}>
              Player {index}:
              <input
                type="text"
                name={`player${index}`}
                value={formData[`player${index}`]}
                onChange={(e) => setFormData({ ...formData, [`player${index}`]: e.target.value })}
                required
              />
            </label>
          ))}
          <label>
            Team Name:
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              required
            />
          </label>
        </div>
      );
    }

    if (selectedTournament && selectedTournament.category.includes('COD')) {
      return (
        <div>
          {/* Additional inputs for COD Player */}
          {[1, 2, 3, 4, 5].map((index) => (
            <label key={index}>
              Player {index}:
              <input
                type="text"
                name={`player${index}`}
                value={formData[`player${index}`]}
                onChange={(e) => setFormData({ ...formData, [`player${index}`]: e.target.value })}
                required
              />
            </label>
          ))}
          <label>
            Team Name:
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              required
            />
          </label>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="tournament-form my-custom-form-class">
      <h2>Tournament Registration</h2>
      {step === 1 && (
        <form onSubmit={handleFormSubmit}>
          {selectedTournament && selectedTournament.Player !== 'Multiple' && (
            <>
              <label>
                Game ID:
                <input
                  type="text"
                  name="gameId"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  required
                />
              </label>
              <label>
                User Name:
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </label>
            </>
          )}
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
          {renderAdditionalInputs()}
          <button type="submit">Submit</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePaymentSubmit}>
          <div>
            <h3>Payment Section</h3>
            <label>Entry Fee: {entryFee}</label>
            <QRCode value="9073357827-2@ybl" size={256} />
            <div className='upi'>
              <h3>Upi Id Phone pay- (9073357827-2@ybl)</h3>
              <h3>Gpay- argha820@oksbi</h3>
            </div>
            <label>Transaction Id / UTR No:</label>
            <input
              type="text"
              name="utrNo"
              value={utrNo}
              onChange={(e) => setUtrNo(e.target.value)}
              required
            />
            <button type="submit">Submit Payment</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TournamentForm;
