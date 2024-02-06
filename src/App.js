// App.js
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import axios from 'axios';


function App() {
  const [csvData, setCsvData] = useState(null);

  const handleCsvUpload = (data) => {
    // Log the CSV data to the console (you can process it further if needed)
    console.log('CSV Data:', data);

    // Upload the CSV data to the database using an API
    axios.post('/api/upload-csv', { data })
      .then(response => {
        console.log('Upload successful:', response.data);
      })
      .catch(error => {
        console.error('Error uploading CSV:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <CSVReader onFileLoaded={handleCsvUpload} />
        
      
       
      </header>
    </div>
  );
}

export default App;
