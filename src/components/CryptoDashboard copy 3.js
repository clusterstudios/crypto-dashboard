import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCaretUp, FaCaretDown, FaStar } from 'react-icons/fa';

function CryptoDashboard() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortAscending, setSortAscending] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            limit: 10,
            sparkline: false,
            localization: false,
            market: 'crypto'
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
  }, []);

  const handleSort = (field) => {
    const sortedCryptos = [...cryptos];
    if (sortAscending) {
      sortedCryptos.sort((a, b) => a[field] - b[field]);
    } else {
      sortedCryptos.sort((a, b) => b[field] - a[field]);
    }
    setCryptos(sortedCryptos);
    setSortField(field);
    setSortAscending(!sortAscending);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField === field) {
      return sortAscending ? <FaCaretUp /> : <FaCaretDown />;
    }
    return null;
  };

  if (loading) return <div className="text-center m-5">Loading...</div>;
  if (error) return <div className="alert alert-danger" role="alert">Error: {error.message}</div>;

  return (
    <div className="container mt-5 crypto-dashboard">
      <h2 className="text-left mb-4">Today's Cryptocurrency Prices by Market Cap</h2>
      <div>
        <table className="table">
        <thead>
    <tr>
        <th className="text-left" style={{ paddingTop: '20px', paddingBottom: '20px' }}></th>
        <th className="text-left" style={{ paddingTop: '20px', paddingBottom: '20px' }}>#</th>
        <th className="text-left" style={{ paddingTop: '20px', paddingBottom: '20px' }}>Name</th>
        <th className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }} onClick={() => handleSort('current_price')}>
            Price <SortIcon field="current_price" />
        </th>
        <th className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }} onClick={() => handleSort('market_cap')}>
            Market Cap <SortIcon field="market_cap" />
        </th>
        <th className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }} onClick={() => handleSort('total_volume')}>
            Volume <SortIcon field="total_volume" />
        </th>
        <th className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }} onClick={() => handleSort('circulating_supply')}>
            Circulating Supply <SortIcon field="circulating_supply" />
        </th>
        <th className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>24hr Change</th>
        <th className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>Last 7 Days</th>
    </tr>
</thead>

          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td className="text-left" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
    <button onClick={() => toggleFavorite(crypto.id)} style={{ border: 'none', background: 'transparent' }}>
        <FaStar style={favorites.includes(crypto.id) ? { color: 'gold' } : { color: 'transparent', stroke: 'black', strokeWidth: '10px' }} />
    </button>
</td>
                <td className="text-left" style={{ paddingTop: '20px', paddingBottom: '20px' }}>{index + 1}</td>
                <td className="text-left" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                  <img src={crypto.image} alt={crypto.name} width="26" height="26" className="mr-3" />
                  {crypto.name}
                </td>
                <td className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>${crypto.current_price ? crypto.current_price.toFixed(2) : 'N/A'}</td>
                <td className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>${crypto.market_cap ? crypto.market_cap.toLocaleString() : 'N/A'}</td>
                <td className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>${crypto.total_volume ? crypto.total_volume.toLocaleString() : 'N/A'}</td>
                <td className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>{crypto.circulating_supply ? crypto.circulating_supply.toLocaleString() : 'N/A'}</td>
                <td className={`text-right ${crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                  {crypto.price_change_percentage_24h ? (
                    <>
                      {crypto.price_change_percentage_24h >= 0 ? <FaCaretUp className="mr-1 text-success" /> : <FaCaretDown className="mr-1 text-danger" />}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </>
                  ) : 'N/A'}
                </td>
                <td className="text-right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>{/* Last 7 Days chart here */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoDashboard;
