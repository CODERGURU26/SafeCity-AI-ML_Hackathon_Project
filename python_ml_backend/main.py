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


@app.get("/city/{city_name}/statistics")
def get_city_statistics(city_name: str):
    """
    Returns detailed statistics for a specific city
    """
    city_data = df[df['City'].str.lower() == city_name.lower()]
    
    if city_data.empty:
        return {"error": "City not found"}
    
    total_incidents = len(city_data)
    avg_police = city_data['police_needed'].mean()
    risk_level = city_data['risk_zone'].iloc[0]
    
    return {
        "city": city_name,
        "total_incidents": int(total_incidents),
        "average_police_needed": float(avg_police),
        "risk_level": risk_level,
        "latitude": float(city_data['latitude'].iloc[0]),
        "longitude": float(city_data['longitude'].iloc[0])
    }


@app.get("/statistics")
def get_overall_statistics():
    """
    Returns overall crime statistics
    """
    return {
        "total_incidents": len(df),
        "total_cities": df['City'].nunique(),
        "average_police_per_incident": float(df['police_needed'].mean()),
        "highest_risk_city": df[df['risk_zone'] == 'High']['City'].mode()[0] if 'High' in df['risk_zone'].values else None,
        "cities_by_risk": {
            "High": int((df['risk_zone'] == 'High').sum()),
            "Medium": int((df['risk_zone'] == 'Medium').sum()),
            "Low": int((df['risk_zone'] == 'Low').sum())
        }
    }
