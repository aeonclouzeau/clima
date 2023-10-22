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

	useEffect(() => {
		// Puedes usar esta función para cargar el clima por defecto al cargar la página.
		// Simplemente proporciona una ubicación inicial y llama a handleSubmit.
		// handleSubmit({ target: { value: 'Ciudad,País' } });
	}, []);

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
					<button type="submit">Obtener Clima</button>
				</form>

				{weatherData && (
					<div class="data_container">
						<h2>
							Clima en {weatherData.name}, {weatherData.sys.country}
						</h2>
						<p>Temperatura: {weatherData.main.temp}°C</p>
						<p>Descripción: {weatherData.weather[0].description}</p>
						{/* Puedes agregar más detalles del clima aquí */}
					</div>
				)}
			</div>
		</div>
	);
};

export default WeatherApp;
