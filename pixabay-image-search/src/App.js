import React, { useState } from 'react';
import axios from 'axios';
import * as Keys from './data/Keys.js';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, TextField, InputAdornment, IconButton, Typography, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import "./index.css";
import AppBar from '@mui/material/AppBar';
import Modal from '@mui/material/Modal';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function App() {
  const key = Keys.API_KEY;

  var [searchTerm, setSearchTerm] = useState('');
  var [searchResults, setSearchResults] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            console.log(response.data.hits);
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  return (
    <div>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <Typography color="inherit" type="title">
            Pixabay Search Engine
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSearch}>
        <div style={{display: 'flex',  justifyContent:'center'}}>
          <h1>Pixabay Search Engine</h1>
        </div>
        <div style={{display: 'flex',  justifyContent:'center'}}>
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
        </div>
      </form>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {searchResults.map((result) => (
            <Grid item xs={2} sm={4} md={4} key={result.id}>
              <Item key={result.id} onClick={handleOpen}>
                <img className="photo" src={result.largeImageURL} alt="" />
              </Item>
              <Modal
                open={open}
                onClose={handleClose}
                key={result.id} 
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...style, width: 200 }}>
                  <h2 id="child-modal-title">{result.user} uploaded this image</h2>
                  <p id="child-modal-description">
                    Relevant tags: {result.tags}
                  </p>
                  <Button onClick={handleClose}>Close Details</Button>
                </Box>
              </Modal>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
