import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        list-style: none;
        border: none;
    }

    body {
        font-family: "Inter";
        color: ${(props) => props.theme.light_theme.text};
        background-color:${(props) =>
			props.theme.light_theme.background};
    }

`;
