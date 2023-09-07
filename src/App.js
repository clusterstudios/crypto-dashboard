import React from 'react';
import Header from './components/Header';  // Updated import path here
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoDashboard from './components/CryptoDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <CryptoDashboard />
    </div>
  );
}

export default App;
