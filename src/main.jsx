import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { Context } from "./context/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Context>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<App />
			</ThemeProvider>
		</Context>
	</React.StrictMode>
);
