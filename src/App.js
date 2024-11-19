import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import React, { useEffect, useState } from 'react';

function App() {
  const [manager, setManager] = useState('');

  useEffect(() => {
    // Similar to componentDidMount
    const fetchManager = async () => {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
    };

    fetchManager();
  }, []); // Empty dependency array ensures this runs only once

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is manager by {manager}</p>
      </div>
  );
}

export default App;
