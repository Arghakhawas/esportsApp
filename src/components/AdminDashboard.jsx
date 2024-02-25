// AdminDashboard.jsx
import React, { useState } from 'react';
import TournamentSettings from './TournamentSettings';
import PointsTableSettings from './PointsTableSettings';
import FixturesSettings from './FixturesSettings';
import FreefireMatchSettings from './FreefireMatchSetting.jsx';
import CodMatchSettings from './CodMatchSettings';
import BgmiMatchSettings from './BgmiMatchSettings';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tournaments'); // Default tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="admin-tabs">
        <button onClick={() => handleTabChange('tournaments')}>Tournaments</button>
        <button onClick={() => handleTabChange('pointsTable')}>Points Table</button>
        <button onClick={() => handleTabChange('fixtures')}>Fixtures</button>
        <button onClick={() => handleTabChange('codMatchSettings')}>COD Match Settings</button>
        <button onClick={() => handleTabChange('bgmiMatchSettings')}>BGMI Match Settings</button>
        <button onClick={() => handleTabChange('freefireMatchSettings')}>Freefire Match Settings</button>
      </div>
      {activeTab === 'tournaments' && <TournamentSettings />} {/* Implement TournamentSettings component */}
      {activeTab === 'pointsTable' && <PointsTableSettings />} {/* Implement PointsTableSettings component */}
      {activeTab === 'fixtures' && <FixturesSettings />} {/* Implement FixturesSettings component */}
      {activeTab === 'codMatchSettings' && <CodMatchSettings />} {/* Implement CodMatchSettings component */}
      {activeTab === 'bgmiMatchSettings' && <BgmiMatchSettings />} {/* Implement BgmiMatchSettings component */}
      {activeTab === 'freefireMatchSettings' && <FreefireMatchSettings />} {/* Implement FreefireMatchSettings component */}
    </div>
  );
};

export default AdminDashboard;
