import React, { useContext, useEffect, useState } from "react";
import { Section } from "../styles/Section/Section";
import { Container } from "../styles/Container/Container";
import { ImLocation } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { Input } from "../styles/Input/Input";
import { ContextProvider } from "../context/Context";
import HeroImage from "../assets/undraw_sunlight_re_0usx.svg";
import { Loader } from "../styles/Loader/Loader";
import { motion } from "framer-motion";

const Home = () => {
	const weatherDescriptions = {
		"clear sky": { image: "01d", text: "Céu limpo ☀️" },
		"few clouds": { image: "02d", text: "Algumas nuvens 🌤️" },
		"scattered clouds": {
			image: "03d",
			text: "Nuvens dispersas ⛅",
		},
		"overcast clouds": { image: "03d", text: "Céu Nublado ⛅" },
		"broken clouds": {
			image: "04d",
			text: "Nuvens quebradas 🌥️",
		},
		"shower rain": { image: "09d", text: "Chuva 🌧️" },
		"ligth rain": { image: "10d", text: "Chuva leve 🌧️" },
		rain: { image: "10d", text: "Chuva 🌧️" },
		thunderstorm: { image: "11d", text: "Tempestade 🌩️" },
		snow: { image: "13d", text: "Neve ❄️" },
		mist: { image: "50d", text: "Neblina 🌫️" },
	};
	const {
		handleCityName,
		url,
		dataApi,
		setDataApi,
		cityName,
		notFound,
		setNotFound,
		isLoading,
		setIsLoading,
	} = useContext(ContextProvider);

	const [descriptionFromApi, setDescriptionFromApi] = useState("");

	const fetchData = () => {
		if (cityName) {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					setDescriptionFromApi(
						data.weather[0].description
					);
					setIsLoading(false);
					setDataApi(data.main);
					console.log(data);
					if (data.cod === 404) {
						setNotFound(true);
					} else {
						setNotFound(false);
					}
				})
				.catch((err) => {
					setIsLoading(false);
					alert(err.message);
				})
				.finally(() => setIsLoading(false));
		} else {
			alert("Digite alguma cidade ou país");
		}
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			fetchData();
		}
	};

	const temperature = dataApi && (dataApi.temp / 10).toFixed(1);
	const humidity = dataApi && dataApi.humidity;

	const weatherDescription = weatherDescriptions[descriptionFromApi]
		? weatherDescriptions[descriptionFromApi].text
		: descriptionFromApi;

	const weatherImage = weatherDescriptions[descriptionFromApi]
		? weatherDescriptions[descriptionFromApi].image
		: "01d";

	const nameCityRequested = dataApi && dataApi.name;

	useEffect(() => {
		setDataApi("");
	}, []);

	return (
		<Section>
			<Container
				height="95vh"
				width="40vw"
				borderRadius="10px"
				boxShadow={true}
				backgroundImage="linear-gradient(65deg, #7edaeb, #6594ec)"
				dir="column"
				padding="1rem"
				style={{ position: "relative" }}
				gap="1rem"
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 20,
					duration: 2,
				}}
			>
				<Container
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 20,
						duration: 2,
						delay: 0.2,
					}}
					width="100%"
					justify="space-around"
					className="header-search"
				>
					<Container gap="1rem" className="city-input">
						<ImLocation />
						<Input
							onKeyDown={handleKeyDown}
							onChange={handleCityName}
							type="text"
							value={cityName}
						/>
					</Container>
					<div
						onClick={fetchData}
						className="search-button"
					>
						<AiOutlineSearch />
					</div>
				</Container>
				{isLoading && <Loader />}
				{dataApi ? (
					<>
						<motion.div
							initial={{ opacity: 0, x: 100, scale: 0 }}
							animate={{ opacity: 1, x: 0, scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
								duration: 5,
								delay: 0.55,
							}}
							className="image-wheater"
						>
							<img
								className="image-wheater"
								src={`https://openweathermap.org/img/wn/${weatherImage}.png`}
								alt="Description from API"
							/>
						</motion.div>
						<motion.div className="actual-climate">
							{weatherDescription}
						</motion.div>
						<Container
							gap="1rem"
							className="name-actual_city"
						>
							{nameCityRequested}
						</Container>

						<Container
							gap="2rem"
							className="temperature-humidity"
						>
							<Container
								gap="1rem"
								className="temperature"
							>
								<FaTemperatureLow />
								<h1>{temperature}° C</h1>
							</Container>
							<Container
								gap="1rem"
								className="humidity"
							>
								<WiHumidity className="humidity-icon" />
								<h1>{humidity}%</h1>
							</Container>
						</Container>
					</>
				) : (
					<Container
						className="not-type_search"
						dir="column"
						gap="5rem"
					>
						<motion.h1
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
								duration: 2,
								delay: 0.3,
							}}
						>
							Pesquise alguma cidade ou país !
						</motion.h1>
						<motion.img
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
								duration: 2,
								delay: 0.5,
							}}
							className="hero-image"
							src={HeroImage}
							alt=""
						/>
					</Container>
				)}
			</Container>
		</Section>
	);
};

export default Home;
