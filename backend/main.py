from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# Allow requests from your React frontend (adjust port if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Open-Meteo API endpoint (No API Key Required)
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

@app.get("/api/weather")
async def get_weather(latitude: float, longitude: float):
    # Define the specific parameters we want from the API
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,weather_code,wind_speed_10m",
        "timezone": "auto"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(OPEN_METEO_URL, params=params)
        
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch weather data")
            
        return response.json()