import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";

const WeatherApp = () => {
	const [location, setLocation] = useState("");
	const [weatherData, setWeatherData] = useState(null);

	const apiKey = "d3045006b2ffa1d7eb6e5aaf90f5d245";

	const handleLocationChange = (e) => {
		setLocation(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
			);
			setWeatherData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {}, []);

	return (
		<div>
			<h1>
				Weather <span className="highlight">App</span>
			</h1>
			<div class="container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Enter desired location"
						value={location}
						onChange={handleLocationChange}
					/>
					<button type="submit">Get forcast</button>
				</form>

				{weatherData && (
					<div class="data_container">
						<h2>
							Forcast in {weatherData.name}, {weatherData.sys.country}
						</h2>
						<p>Feels like: {weatherData.main.temp}°C</p>
						<p>Looks like: {weatherData.weather[0].description}</p>
						{/* Puedes agregar más detalles del clima aquí */}
					</div>
				)}
			</div>
		</div>
	);
};

export default WeatherApp;
