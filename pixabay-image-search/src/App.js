import React, { useState } from 'react';
import axios from 'axios';
import * as Keys from './data/Keys.js';


function App() {
  const key = Keys.API_KEY;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=${key}&q=${searchTerm}&image_type=photo`);
      setSearchResults(response.data.hits);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h1>Pixabay Search Engine</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.pageURL}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
