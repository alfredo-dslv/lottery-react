import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import React, { useEffect, useState } from 'react';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Similar to componentDidMount
    const fetchContractData = async () => {
      const manager = await lottery.methods.manager().call();
      setManager(manager);

      const players = await lottery.methods.getPlayers().call();
      setPlayers(players);

      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(balance);
    };

    fetchContractData();

  }, []); // Empty dependency array ensures this runs only once

  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Show spinner
    setLoading(true);

    setMessage('Waiting on transaction success...')

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    });

    setLoading(false);
    setMessage('You have been entered!')
  };


    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is manager by {manager}
          There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value={value}
              onChange={(event) => setValue(event.target.value)} 
            />
          </div>
          <button disabled={loading}>{loading ? 'Processing...' : 'Enter'}</button>
          </form>

          <hr />

          <h1>{message}</h1>
      </div>
  );
}

export default App;
