import styled from "styled-components";
import "./Container.css";

export const Container = styled.div`
	display: flex;
	flex-direction: ${(props) => (props.dir ? props.dir : "center")};
	align-items: ${(props) => (props.align ? props.align : "center")};
	justify-content: ${(props) =>
		props.justify ? props.justify : "center"};
	gap: ${(props) => props.gap};
	padding: ${(props) => props.padding};
	height: ${(props) => props.height};
	width: ${(props) => props.width};
	background-image: ${(props) => props.backgroundImage};
	box-shadow: ${(props) =>
		props.boxShadow === true ? "2px 2px 4px #3235388d" : ""};
	border-radius: ${(props) => props.borderRadius};
`;
