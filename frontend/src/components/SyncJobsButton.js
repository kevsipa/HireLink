// jobify-frontend/src/components/SyncJobsButton.js
import React from 'react';
import axios from '../api/axios';

const SyncJobsButton = () => {
  const handleSync = async () => {
    try {
      const response = await axios.post('/api/external-jobs/create');
      console.log('Jobs created:', response.data);
      // Optionally update state or notify the user here
    } catch (error) {
      console.error('Error syncing jobs:', error);
    }
  };

  return (
    <button
      onClick={handleSync}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Sync Remote Jobs
    </button>
  );
};

export default SyncJobsButton;
