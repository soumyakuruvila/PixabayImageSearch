import React, { useState } from 'react';
import axios from 'axios';
import * as Keys from './data/Keys.js';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
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

  var [searchTerm, setSearchTerm] = useState('');
  var [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  function handleSearch(e) {
    e.preventDefault();
    axios.get(`https://pixabay.com/api/?key=${key}&q=${searchTerm}&image_type=photo`)
        .then(function (response) {
            setSearchResults(response.data.hits);
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  return (
    <div>
    <form onSubmit={handleSearch}>
      <h1>Pixabay Search Engine</h1>
      <TextField placeholder="Enter search term" onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment>
            <button>
              <IconButton>
                <SearchIcon />
              </IconButton>
              </button>
            </InputAdornment>
          )
        }}
      />
    </form>
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
