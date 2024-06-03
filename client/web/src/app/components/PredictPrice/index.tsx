import React from "react";

import { Navbar } from "../navbar";

const allowedBrands = [
  "Select Brand",
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
];
const allowedLocations = [
  "Select Location",
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
];
const allowedFuelTypes = ["Select Fuel Type", "CNG", "Diesel", "Petrol", "LPG"];
const allowedTransmissions = ["Select Transmission", "Manual", "Automatic"];
const allowedOwnerTypes = [
  "Select Owner Type",
  "First",
  "Second",
  "Fourth & Above",
  "Third",
];

const PredictPrice = () => {
  const [brand, setBrand] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [year, setYear] = React.useState<number>(0);
  const [kmsDriven, setKmsDriven] = React.useState<number>(0);
  const [fuelType, setFuelType] = React.useState<string>("");
  const [transmission, setTransmission] = React.useState<string>("");
  const [ownerType, setOwnerType] = React.useState<string>("");
  const [mileage, setMileage] = React.useState<number>(0);
  const [engine, setEngine] = React.useState<number>(0);
  const [maxPower, setMaxPower] = React.useState<number>(0);
  const [seats, setSeats] = React.useState<number>(0);
  const [carAge, setCarAge] = React.useState<number>(0);

  const [predictedPrice, setPredictedPrice] = React.useState<number | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async () => {
    setError("");
    setPredictedPrice(null);
    setLoading(true);
    if (brand === "") {
      setError("Please select a brand");
      return;
    }
    if (location === "") {
      setError("Please select a location");
      return;
    }
    if (year === 0) {
      setError("Please enter year");
      return;
    }
    if (kmsDriven === 0) {
      setError("Please enter kilometers driven");
      return;
    }
    if (fuelType === "") {
      setError("Please select fuel type");
      return;
    }
    if (transmission === "") {
      setError("Please select transmission");
      return;
    }
    if (ownerType === "") {
      setError("Please select owner type");
      return;
    }
    if (mileage === 0) {
      setError("Please enter mileage");
      return;
    }
    if (engine === 0) {
      setError("Please enter engine");
      return;
    }
    if (maxPower === 0) {
      setError("Please enter power");
      return;
    }
    if (seats === 0) {
      setError("Please enter seats");
      return;
    }
    if (carAge === 0) {
      setError("Please enter car age");
      return;
    }
    await fetch("https://auto-forecast-1.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: brand,
        location,
        year,
        kilometers_driven: kmsDriven,
        fuel_type: fuelType,
        transmission,
        owner_type: ownerType,
        mileage,
        engine,
        max_power: maxPower,
        seats,
        age: carAge,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.prediction) {
          setPredictedPrice(data.prediction);
        } else {
          setError("Error predicting price");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Error predicting price");
      });
  };

  return (
    <>
      <Navbar />
      <div className="px-4 py-12 md:py-24 lg:py-32 bg-black">
        <div className="container mx-auto prose lg:prose-lg xl:prose-xl flex justify-center items-center">
          <div className="grid gap-8 md:gap-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Predict car prices
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter the details of the car to predict the price.
              </p>
            </div>
            <div className="space-y-8">
              <div className="space-y-2 w-full">
                <p className="text-white">Car Brand</p>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                >
                  {allowedBrands.map((brand, index) => (
                    <option
                      key={`${brand}-${index}-${Math.random()}`}
                      value={index === 0 ? "" : brand}
                    >
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 w-full">
                <p className="text-white">Location</p>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                >
                  {allowedLocations.map((location, index) => (
                    <option
                      key={`${location}-${index}`}
                      value={index === 0 ? "" : location}
                    >
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 w-half">
                  <p className="text-white">Year</p>
                  <input
                    type="number"
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                    placeholder="Enter year"
                    min={2000}
                    max={2024}
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2 w-half">
                  <p className="text-white">Kilometers driven</p>
                  <input
                    type="number"
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                    placeholder="Enter kilometers driven"
                    min={0}
                    max={1000000}
                    value={kmsDriven}
                    onChange={(e) => setKmsDriven(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 w-half">
                  <p className="text-white">Fuel type</p>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                  >
                    {allowedFuelTypes.map((fuelType, index) => (
                      <option
                        key={`${fuelType}-${index}`}
                        value={index === 0 ? "" : fuelType}
                      >
                        {fuelType}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 w-half">
                  <p className="text-white">Transmission</p>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                  >
                    {allowedTransmissions.map((transmission, index) => (
                      <option
                        key={`${transmission}-${index}`}
                        value={index === 0 ? "" : transmission}
                      >
                        {transmission}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 w-half">
                  <p className="text-white">Owner type</p>
                  <select
                    value={ownerType}
                    onChange={(e) => setOwnerType(e.target.value)}
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                  >
                    {allowedOwnerTypes.map((ownerType, index) => (
                      <option
                        key={`${ownerType}-${index}`}
                        value={index === 0 ? "" : ownerType}
                      >
                        {ownerType}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 w-half">
                  <p className="text-white">Mileage</p>
                  <input
                    type="number"
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                    placeholder="Enter mileage"
                    min={0}
                    max={50}
                    value={mileage}
                    onChange={(e) => setMileage(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 w-half">
                  <p className="text-white">Engine Capacity (cc)</p>
                  <input
                    type="number"
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                    placeholder="Enter engine"
                    min={0}
                    max={5000}
                    value={engine}
                    onChange={(e) => setEngine(parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2 w-half">
                  <p className="text-white">Max Power (bhp)</p>
                  <input
                    type="number"
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                    placeholder="Enter power"
                    min={0}
                    max={500}
                    value={maxPower}
                    onChange={(e) => setMaxPower(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 w-half">
                  <p className="text-white">Seats</p>
                  <input
                    type="number"
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                    placeholder="Enter seats"
                    min={0}
                    max={10}
                    value={seats}
                    onChange={(e) => setSeats(parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2 w-half">
                  <p className="text-white">Car age</p>
                  <input
                    type="number"
                    className="w-full hover:border-red-500 border-2 border-solid bg-gray-800 pl-5 pr-5 pt-2 pb-2 rounded-md text-gray-400"
                    placeholder="Enter car age"
                    min={0}
                    max={30}
                    value={carAge}
                    onChange={(e) => setCarAge(parseInt(e.target.value))}
                  />
                </div>
              </div>

              {error && <div className="text-red-500">{error}</div>}

              {predictedPrice && (
                <div className="text-green-500">
                  Predicted price: ₹
                  {new Intl.NumberFormat().format(predictedPrice)}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white hover:border-transparent border-2 border-solid pl-5 pr-5 pt-2 pb-2 rounded-md"
              >
                {loading ? "Predicting..." : "Predict Price"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PredictPrice;
