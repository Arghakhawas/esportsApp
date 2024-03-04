import React, { useState } from 'react';

const TournamentCreationForm = ({ onSubmit }) => {
  const [gameCategory, setGameCategory] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [map, setMap] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [prizeDistribution, setPrizeDistribution] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [image, setImage] = useState(null); // Added state for image

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('gameCategory', gameCategory);
    formData.append('gameMode', gameMode);
    formData.append('map', map);
    formData.append('entryFee', entryFee);
    formData.append('prizeDistribution', prizeDistribution);
    formData.append('registrationDeadline', registrationDeadline);
    formData.append('image', image); // Append the image to FormData

    // Pass FormData to the onSubmit function
    onSubmit(formData);
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="tournament-creation-form">
      <h2>Create Tournament</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Game Category:
          <input
            type="text"
            value={gameCategory}
            onChange={(e) => setGameCategory(e.target.value)}
            required
          />
        </label>
        <label>
          Game Mode:
          <input
            type="text"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            required
          />
        </label>
        <label>
          Map:
          <input
            type="text"
            value={map}
            onChange={(e) => setMap(e.target.value)}
            required
          />
        </label>
        <label>
          Entry Fee:
          <input
            type="text"
            value={entryFee}
            onChange={(e) => setEntryFee(e.target.value)}
            required
          />
        </label>
        <label>
          Prize Distribution:
          <textarea
            value={prizeDistribution}
            onChange={(e) => setPrizeDistribution(e.target.value)}
            required
          />
        </label>
        <label>
          Registration Deadline:
          <input
            type="datetime-local"
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
            required
          />
        </label>
        <label>
          Tournament Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        <button type="submit">Create Tournament</button>
      </form>
    </div>
  );
};

export default TournamentCreationForm;
