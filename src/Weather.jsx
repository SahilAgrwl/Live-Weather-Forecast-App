import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      setLoading(true);
      setError('');

      // Replace 'YOUR_WEATHER_API_KEY' with your actual weather API key
      const API_KEY = '15462012c70498eccf3e6fd8695dd87f';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again later.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!weatherData) {
    return <p>No weather data available.</p>;
  }

  return (
    <div className="weather-container">
      <h2 className="weather-title">{weatherData.name}</h2> <br/>
      <p className="weather-temp">Temperature: {weatherData.main.temp} °C</p> <br/>
      <p className="weather-humidity">Humidity: {weatherData.main.humidity}%</p> <br/>
      <p className="weather-description">Description: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default Weather;
