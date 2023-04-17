import { darken } from "polished";
import styled from "styled-components";

export const Footer = styled.footer`
	min-width: 100%;
	height: 13vh;
	background-color: ${(props) =>
		darken(0.1, props.theme.light_theme.background)};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 1rem 2rem;

	.social-icons a {
		font-size: 2em;
		margin-bottom: 1rem;
        color: white;
	}
`;
