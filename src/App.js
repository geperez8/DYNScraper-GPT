import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS Anywhere proxy
    const targetUrl = url; // URL entered by the user
    setLoading(true);

    try {
      const response = await axios.get(`${proxyUrl}${targetUrl}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={fetchData}>Fetch Data</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <textarea
          value={data}
          readOnly
          style={{ width: '100%', height: '300px' }}
        />
      )}
    </div>
  );
}

export default App;