import styled from "styled-components";

export const Loader = styled.div`
	& {
		animation: is-rotating 1s infinite;
		border: 3px solid #e5e5e5;
		border-radius: 50%;
		border-top-color: #34d6b3;
		height: 30px;
		width: 30px;
	}

	@keyframes is-rotating {
		to {
			transform: rotate(1turn);
		}
	}
`;
