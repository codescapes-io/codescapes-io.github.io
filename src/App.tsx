import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import CSFooter from './component/CSFooter';
// import Container from './view/Container';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Container /> */}
      <CSFooter />
    </div>
  );
}

export default App;
