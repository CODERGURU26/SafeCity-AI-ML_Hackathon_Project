from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(title="SafeCity API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load PKL once when server starts
df = pd.read_pickle("final_city_predictions.pkl")


@app.get("/")
def home():
    return {"message": "SafeCity API running"}


@app.get("/zones")
def get_all_zones():
    """
    Returns all cities with lat, lon, risk, police
    """
    return df[['City', 'latitude', 'longitude', 'risk_zone', 'police_needed']] \
        .to_dict(orient="records")


@app.get("/city/{city_name}")
def get_city(city_name: str):
    """
    Example: /city/andheri
    """
    row = df[df['City'].str.lower() == city_name.lower()]

    if row.empty:
        return {"error": "City not found"}

    result = row.iloc[0]

    return {
        "city": result["City"],
        "latitude": float(result["latitude"]),
        "longitude": float(result["longitude"]),
        "risk_zone": result["risk_zone"],
        "police_needed": int(result["police_needed"])
    }