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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      gameId,
      userName,
      phoneNumber,
    };

    try {
      await onSubmit(formData);
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

  return (
    <div className="tournament-form my-custom-form-class">
      <h2>Tournament Registration</h2>
      {step === 1 && (
        <form onSubmit={handleFormSubmit}>
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
          {selectedTournament && selectedTournament.Player === 'Multiple' && (
            <div>
              {/* Form for Multiple Players (4 teams) */}
              <label>
                Game ID Team 1:
                <input
                  type="text"
                  name="gameIdTeam1"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  required
                />
              </label>

              <label>
                Game ID Team 1:
                <input
                  type="text"
                  name="gameIdTeam1"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  required
                />
              </label>              <label>
                Game ID Team 1:
                <input
                  type="text"
                  name="gameIdTeam1"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  required
                />
              </label>
              {/* Add similar fields for Game IDs of Team 2, 3, and 4 */}
              {/* ... */}
              <label>
                Leader Phone Number:
                <input
                  type="tel"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Team Name:
                <input
                  type="text"
                  name="teamName"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </label>
            </div>
          )}
          {selectedTournament && selectedTournament.Player === 'COD' && (
            <div>
              {/* Form for COD Players (5 players) */}
              <label>
                Game ID Player 1:
                <input
                  type="text"
                  name="gameIdPlayer1"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  required
                />
              </label>              <label>
                Game ID Team 1:
                <input
                  type="text"
                  name="gameIdTeam1"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  required
                />
              </label>
              {/* Add similar fields for Game IDs of Player 2 to 5 */}
              {/* ... */}
              <label>
                Leader Phone Number:
                <input
                  type="tel"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Team Name:
                <input type="text" name="teamName" required />
              </label>
            </div>
          )}
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
              <h3>Upi Id Phone pay- 9073357827-2@ybl</h3>
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
