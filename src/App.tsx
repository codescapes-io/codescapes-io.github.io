import React from 'react';
import './App.css';
import CSLayout from './component/Layout/CSLayout';
import { HashRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App" title='App'>
        <CSLayout />
      </div>
    </Router>
  );
}

export default App;
