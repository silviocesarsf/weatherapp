import { createContext, useState } from "react";

export const ContextProvider = createContext();

export const Context = ({ children }) => {
	const [cityName, setCityName] = useState("");
	const [dataApi, setDataApi] = useState([]);
	const [notFound, setNotFound] = useState(false);

	const handleCityName = (event) => {
		setCityName(event.target.value);
	};

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4af3783645c864e25a37ee9a2f668dc6`;

	return (
		<ContextProvider.Provider
			value={{
				handleCityName,
				cityName,
				url,
				setDataApi,
				dataApi,
				notFound,
				setNotFound,
			}}
		>
			{children}
		</ContextProvider.Provider>
	);
};
