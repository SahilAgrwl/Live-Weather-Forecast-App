import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import CitySearch from './CitySearch'
import Weather from './Weather'
import './styles.css'

function App() {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LIVE WEATHER FORECAST</h1>
      </header>
      <main>
        <CitySearch onCitySelect={handleCitySelect} />
        {selectedCity && <Weather city={selectedCity} />} {/* Pass the selectedCity to the Weather component */}
      </main>
    </div>
  );
}

export default App
