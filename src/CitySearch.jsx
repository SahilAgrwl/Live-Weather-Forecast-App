import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const CitySearch = ({ onCitySelect }) => {
  const [cityName, setCityName] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setCityName(value);
  };

  useEffect(() => {
    if (cityName) {
      fetchCitySuggestions(cityName);
    } else {
      setCitySuggestions([]);
    }
  }, [cityName]);

  const fetchCitySuggestions = async (value) => {
    try {
      setLoading(true);
      setError('');
  
      const API_KEY = '0ee916ef3emsh47229472c5579a7p144d45jsnddee1f28fb70';
      const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
      const apiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}`;
  
      const response = await axios.get(proxyUrl + apiUrl, {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      });
  
      setCitySuggestions(response.data.data);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
  
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
      }
  
      setError('Error fetching city suggestions. Please try again later.');
      setCitySuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSelect = (value) => {
    setCityName(value);
    onCitySelect(value);
  };

  return (
    <div className="city-search-container">
    <input
      type="text"
      placeholder="Enter city name..."
      value={cityName}
      onChange={handleInputChange}
      className="city-search-input form-control"
    />
    <button onClick={() => onCitySelect(cityName)} className="city-search-button btn btn-primary">
      Search
    </button>

    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {!loading && citySuggestions.length === 0 && cityName && <p>No city suggestions found.</p>}

    {!loading && citySuggestions.length > 0 && (
      <ul className="city-suggestions">
        {citySuggestions.map((city) => (
          <li
            key={city.id}
            onClick={() => handleSelect(city.name)}
            className="city-suggestion-item"
          >
            {city.name}
          </li>
        ))}
      </ul>
    )}
  </div>
  );

};

export default CitySearch;
