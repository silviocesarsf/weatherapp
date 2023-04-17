import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Home from "./pages/Home";
import { Footer } from "./styles/Footer/Footer";
import { Container } from "./styles/Container/Container";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

function App() {
	return (
		<>
			<Home />
			<Footer>
				<Container className="social-icons" gap="1rem">
					<a href="#" target="_blank">
						<AiFillTwitterCircle />
					</a>
					<a
						href="https://www.linkedin.com/in/silviocesarsf/"
						target="_blank"
					>
						<AiFillLinkedin />
					</a>
					<a
						href="https://github.com/silviocesarsf?tab=repositories"
						target="_blank"
					>
						<AiFillGithub />
					</a>
				</Container>
				<p>Desenvolvido por Silvio César.</p>
			</Footer>
		</>
	);
}

export default App;
