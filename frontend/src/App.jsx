import { useState } from 'react'
import './App.css'

function App() {
  const [lat, setLat] = useState('52.52')
  const [lon, setLon] = useState('13.41')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    setLoading(true)
    setError('')
    setWeather(null)
    
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/weather?latitude=${lat}&longitude=${lon}`
      )
      
      if (!response.ok) throw new Error('Failed to fetch weather')
      
      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>🌤️ Simple Weather App</h1>
      
      <div className="input-group">
        <input 
          type="number" 
          step="0.01" 
          value={lat} 
          onChange={(e) => setLat(e.target.value)} 
          placeholder="Latitude"
        />
        <input 
          type="number" 
          step="0.01" 
          value={lon} 
          onChange={(e) => setLon(e.target.value)} 
          placeholder="Longitude"
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2 font-color: black>Current Weather</h2>
          <p><strong>Temperature:</strong> {weather.current.temperature_2m} {weather.current_units.temperature_2m}</p>
          <p><strong>Wind Speed:</strong> {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</p>
          <p><strong>Weather Code:</strong> {weather.current.weather_code}</p>
          <p><small>Coordinates: {weather.latitude}, {weather.longitude}</small></p>
        </div>
      )}
    </div>
  )
}

export default App