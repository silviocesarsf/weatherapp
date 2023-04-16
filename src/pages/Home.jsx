import React, { useContext, useEffect, useState } from "react";
import { Section } from "../styles/Section/Section";
import { Container } from "../styles/Container/Container";
import { ImLocation } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { Input } from "../styles/Input/Input";
import sunny from "../assets/sunny.png";
import { ContextProvider } from "../context/Context";

const Home = () => {
	const {
		handleCityName,
		url,
		dataApi,
		setDataApi,
		cityName,
		notFound,
		setNotFound,
	} = useContext(ContextProvider);

	const [nameFromApi, setNameFromApi] = useState("");

	const atualTime = new Date().getHours();

	const fetchData = () => {
		if (cityName) {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					setNameFromApi(data.name);
					setDataApi(data.main);
					console.log(data);
					if (data.cod === "404") {
						setNotFound(true);
					} else {
						setNotFound(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("No city name");
		}
	};

	const temperature =
		dataApi.temp && (dataApi.temp / 10).toFixed(1);

	const humidity = dataApi.humidity && dataApi.humidity;

	useEffect(() => {
		setDataApi("");
		console.log(atualTime);
	}, []);

	return (
		<Section>
			<Container
				height="95vh"
				width="40vw"
				borderRadius="10px"
				boxShadow={true}
				backgroundImage="linear-gradient(65deg, #4fbff3, #d6eff7)"
				dir="column"
				padding="1rem"
				style={{ position: "relative" }}
				gap="1rem"
			>
				<Container
					width="100%"
					justify="space-around"
					className="header-search"
				>
					<Container gap="1rem" className="city-input">
						<ImLocation />
						<Input
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
						<div className="image-wheater">
							{dataApi && <img src={sunny} alt="" />}
						</div>
						<div className="actual-climate">
							{dataApi && (
								<p>
									Atualmente {nameFromApi} está
									ensolarado.
								</p>
							)}
						</div>
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
					<h1>Pesquise alguma cidade</h1>
				)}
				{notFound && <h1>Cidade não encontrada !</h1>}
			</Container>
		</Section>
	);
};

export default Home;
