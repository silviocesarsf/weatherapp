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
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const weatherDescriptions = {
		"clear sky": { image: "☀️", text: "Céu limpo " },
		"few clouds": { image: "🌤️", text: "Algumas nuvens" },
		"scattered clouds": {
			image: "⛅",
			text: "Nuvens dispersas",
		},
		"overcast clouds": { image: "⛅", text: "Céu Nublado" },
		"broken clouds": {
			image: "🌥️",
			text: "Nuvens quebradas",
		},
		"shower rain": { image: "🌧️", text: "Chuva" },
		"light rain": { image: "🌧️", text: "Chuva leve" },
		"moderate rain": { image: "🌧️", text: "Chuva moderada" },
		"very heavy rain": { image: "🌩️", text: "Chuva pesada" },
		"heavy intensity rain": {
			image: "⛈",
			text: "Chuva muito pesada",
		},
	};

	const {
		handleCityName,
		url,
		dataApi,
		setDataApi,
		cityName,
		notFound,
		setNotFound,
	} = useContext(ContextProvider);

	const [descriptionFromApi, setDescriptionFromApi] = useState("");
	const [nameFromApi, setNameFromApi] = useState("");
	const [countryFromApi, setCountryFromApi] = useState("");

	const fetchData = () => {
		if (cityName) {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					setCountryFromApi(data.sys.country);
					setNameFromApi(data.name);
					setDescriptionFromApi(
						data.weather[0].description
					);
					setDataApi(data.main);
					console.log(data);
					if (data.cod === 404) {
						setNotFound(true);
					} else {
						setNotFound(false);
					}
				})
				.catch(() => {
					toast.error("Ocorreu um erro.", {
						position: "top-center",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
						theme: "light",
					});
				});
		} else {
			toast.error("Digite alguma cidade ou país", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: "light",
			});
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

	const weatherImage =
		weatherDescriptions[descriptionFromApi] &&
		weatherDescriptions[descriptionFromApi].image;
	useEffect(() => {
		setDataApi("");
		setNotFound(false);
	}, []);

	return (
		<Section>
			<Container
				borderRadius="10px"
				boxShadow={true}
				backgroundImage="linear-gradient(65deg, #7edaeb, #6594ec)"
				dir="column"
				padding="1rem"
				className="container-weather"
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
				<ToastContainer />
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
				{dataApi ? (
					<>
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								type: "ease-in",
								duration: 1,
								delay: 0.55,
							}}
							className="image-wheater"
						>
							{weatherImage}
						</motion.div>
						<Container
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
								delay: 0.4,
							}}
							gap="1rem"
							className="name-actual_city"
						>
							{`${nameFromApi} - `}
							{countryFromApi}
						</Container>
						<motion.div
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
								duration: 2,
								delay: 0.2,
							}}
							className="actual-climate"
						>
							{weatherDescription}
						</motion.div>

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
				{notFound && <h1>Nada encontrado.</h1>}
			</Container>
		</Section>
	);
};

export default Home;
