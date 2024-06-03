from typing import Union

from fastapi import FastAPI, HTTPException
import pickle
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Union
import pickle
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

# Load the model
model = pickle.load(open("./models/XGBoost Regressor.pkl", "rb"))

allowed_names = [
    "Maruti",
    "Hyundai",
    "Honda",
    "Audi",
    "Nissan",
    "Toyota",
    "Volkswagen",
    "Tata",
    "Land",
    "Mitsubishi",
    "Renault",
    "Mercedes-Benz",
    "BMW",
    "Mahindra",
    "Ford",
    "Porsche",
    "Datsun",
    "Jaguar",
    "Volvo",
    "Chevrolet",
    "Skoda",
    "Mini",
    "Fiat",
    "Jeep",
]

allowed_locations = [
    "Mumbai",
    "Pune",
    "Chennai",
    "Coimbatore",
    "Hyderabad",
    "Jaipur",
    "Kochi",
    "Kolkata",
    "Delhi",
    "Bangalore",
    "Ahmedabad",
]
allowed_fuel_types = ["CNG", "Diesel", "Petrol", "LPG"]
allowed_transmissions = ["Manual", "Automatic"]
allowed_owner_types = ["First", "Second", "Fourth & Above", "Third"]

name_mapping = {
    "Audi": 0,
    "BMW": 1,
    "Chevrolet": 2,
    "Datsun": 3,
    "Fiat": 4,
    "Ford": 5,
    "Honda": 6,
    "Hyundai": 7,
    "Jaguar": 8,
    "Jeep": 9,
    "Land": 10,
    "Mahindra": 11,
    "Maruti": 12,
    "Mercedes-Benz": 13,
    "Mini": 14,
    "Mitsubishi": 15,
    "Nissan": 16,
    "Porsche": 17,
    "Renault": 18,
    "Skoda": 19,
    "Tata": 20,
    "Toyota": 21,
    "Volkswagen": 22,
    "Volvo": 23,
}
location_mapping = {
    "Ahmedabad": 0,
    "Bangalore": 1,
    "Chennai": 2,
    "Coimbatore": 3,
    "Delhi": 4,
    "Hyderabad": 5,
    "Jaipur": 6,
    "Kochi": 7,
    "Kolkata": 8,
    "Mumbai": 9,
    "Pune": 10,
}
fuel_type_mapping = {"CNG": 0, "Diesel": 1, "LPG": 2, "Petrol": 3}
transmission_mapping = {"Automatic": 0, "Manual": 1}
owner_type_mapping = {"First": 0, "Fourth & Above": 1, "Second": 2, "Third": 3}

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


# Load the model
model = pickle.load(open("./models/XGBoost Regressor.pkl", "rb"))

app = FastAPI()


class CarPricePredictionRequest(BaseModel):
    name: str
    location: str
    year: int
    kilometers_driven: int
    fuel_type: str
    transmission: str
    owner_type: str
    mileage: float
    engine: int
    max_power: float
    seats: int
    age: int


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
def predict(request: CarPricePredictionRequest):

    print(request)
    print(request.name)
    print(allowed_names[0])

    if request.name not in allowed_names:
        raise HTTPException(
            status_code=400, detail="Name should be one of the allowed names"
        )
    if request.location not in allowed_locations:
        raise HTTPException(
            status_code=400, detail="Location should be one of the allowed locations"
        )
    if request.fuel_type not in allowed_fuel_types:
        raise HTTPException(
            status_code=400, detail="Fuel type should be one of the allowed fuel types"
        )
    if request.transmission not in allowed_transmissions:
        raise HTTPException(
            status_code=400,
            detail="Transmission should be one of the allowed transmissions",
        )
    if request.owner_type not in allowed_owner_types:
        raise HTTPException(
            status_code=400,
            detail="Owner type should be one of the allowed owner types",
        )
    if request.year < 2000:
        raise HTTPException(status_code=400, detail="Year should be greater than 2000")
    if request.kilometers_driven < 0:
        raise HTTPException(
            status_code=400, detail="Kilometers driven should be greater than 0"
        )
    if request.mileage < 0:
        raise HTTPException(status_code=400, detail="Mileage should be greater than 0")
    if request.engine < 0:
        raise HTTPException(status_code=400, detail="Engine should be greater than 0")
    if request.max_power < 0:
        raise HTTPException(
            status_code=400, detail="Max power should be greater than 0"
        )
    if request.seats < 0:
        raise HTTPException(status_code=400, detail="Seats should be greater than 0")
    if request.age < 0:
        raise HTTPException(status_code=400, detail="Age should be greater than 0")

    data = [
        [
            name_mapping[request.name],
            location_mapping[request.location],
            request.year,
            request.kilometers_driven,
            fuel_type_mapping[request.fuel_type],
            transmission_mapping[request.transmission],
            owner_type_mapping[request.owner_type],
            request.mileage,
            request.engine,
            request.max_power,
            request.seats,
            request.age,
        ]
    ]

    prediction = model.predict(data)[0]
    prediction = np.expm1(prediction)
    prediction = prediction * 100000
    prediction = round(prediction, 0)

    return {"prediction": prediction}


origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    expose_headers=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
