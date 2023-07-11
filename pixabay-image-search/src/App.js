import React, { useState } from 'react';
import axios from 'axios';
import * as Keys from './data/Keys.js';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import "./index.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {searchResults.map((result) => (
            <Grid item xs={2} sm={4} md={4} key={result.id}>
              <Item key={result.id}>
                <img className="photo" src={result.largeImageURL} alt="" />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
