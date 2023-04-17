import styled from "styled-components";

export const Input = styled.input`
	text-transform: uppercase;
	color: ${(props) => props.theme.light_theme.text};
	font-size: 0.8em;
	background-color: transparent;
	border-bottom: 1px solid white;
	padding: 10px 1rem;
	width: 90%;

	@media (max-width: 611px) {
		font-size: 0.6em;
	}

	@media (max-width: 365px) {
		width: 60%;
	}
`;
