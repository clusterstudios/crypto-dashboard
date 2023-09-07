import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

function CryptoDashboard() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: `current_price_${sortDirection}`,
            limit: 10,
            sparkline: false,
            localization: false,
          },
        });
        setCryptos(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [sortDirection]);

  if (loading) return <div className="text-center m-5">Loading...</div>;
  if (error) return <div className="alert alert-danger" role="alert">Error: {error.message}</div>;

  return (
    <div className="container mt-5 crypto-dashboard" style={{ paddingLeft: 0 }}>
      <h2 className="text-left mb-4" style={{ paddingLeft: '10px' }}>Today's Cryptocurrency Prices by Market Cap</h2>
      <div style={{ paddingLeft: '15px' }}>
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Name</th>
              <th className="text-right" onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>Price</th>
              <th className="text-right">Market Cap</th>
              <th className="text-right">Volume</th>
              <th className="text-right">Circulating Supply</th>
              <th className="text-right">24hr Change</th>
              <th className="text-right">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td className="text-left">{index + 1}</td>
                <td className="text-left d-flex align-items-center">
                  <img src={crypto.image} alt={crypto.name} width="26" height="26" className="mr-3" />
                  <strong className="mr-2">{crypto.name}</strong>
                  <span className="text-uppercase">{crypto.symbol}</span>
                </td>
                <td className="text-right">${crypto.current_price ? crypto.current_price.toFixed(2) : 'N/A'}</td>
                <td className="text-right">${crypto.market_cap ? crypto.market_cap.toLocaleString() : 'N/A'}</td>
                <td className="text-right">${crypto.total_volume ? crypto.total_volume.toLocaleString() : 'N/A'}</td>
                <td className="text-right">{crypto.circulating_supply ? crypto.circulating_supply.toLocaleString() : 'N/A'}</td>
                <td className={`text-right ${crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`}>
                  {crypto.price_change_percentage_24h ? (
                    <>
                      {crypto.price_change_percentage_24h >= 0 ? <FaCaretUp className="mr-1" /> : <FaCaretDown className="mr-1" />}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </>
                  ) : 'N/A'}
                </td>
                <td className="text-right">
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoDashboard;
