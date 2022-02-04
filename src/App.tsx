import React from 'react';
import './App.css';
import CSNavbar from './component/CSNavbar';
import CSFooter from './component/CSFooter';
import { Box } from '@mui/system';

function App() {
  return (
    <Box className="App" sx={{ fontFamily: 'Montserrat' }}>
      <CSNavbar />
      <CSFooter />
    </Box>
  );
}

export default App;
