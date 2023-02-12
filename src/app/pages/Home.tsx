import { useState } from "react";
import logo from "../../assets/images/v69_2220.png";
import image1 from "../../assets/images/image_1.png";
import { useAuth } from "../common/hooks/useAuth";
import App from "./app/App";
import { useHome } from "./useHome";
import "./Home.css";
import { Footer } from "../common/component/Footer";
import { Menu as MenuBar } from "../common/component/Menu";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";

export const Home = () => {
	const images = [image1];
	const [show, setShow] = useState<boolean>(false);

	const { isAuthenticated } =
		useAuth();
	if (isAuthenticated()) {
		return <App />;
	} else {

		return (
			<div className="home-wrapper">
				<div className="navbar navbar-light justify-content-between container-fluid border-blue">
					<MenuBar showSideBar={show} hideSideBar={() => setShow(false)} />
					<div className="p-2 w-100 p-d-flex p-jc-center">
						<div>
							<button
								className="btn p-m-2 button-toggle"
								type="button"
								onClick={() => setShow(true)}
							>
								<span className="navbar-toggler-icon" />
							</button>
							<a className="navbar-brand " href="/">
								<img alt="logo" src={logo} className="img-logo" />
							</a>
						</div>
					</div>
				</div>

				<div
					className="p-d-flex p-jc-center"
					style={{
						height: "52rem",
						backgroundSize: "cover",
						backgroundImage: `url(${images[0]})`,
					}}
				>
					<div className="login-container">
						<div className="p-d-flex p-flex-column p-ai-center">
							<hr></hr>
							<h4 className="title-login">Login como Administrador</h4>
							<hr></hr>
							<div className="p-field p-col-12">
								<label htmlFor="matricula">
									Matrícula
								</label>
								<InputText
									id="matricula"
									className="w-100 input-form"
									maxLength={10}
								/>
							</div>
							<div className="p-field p-col-12">
								<label htmlFor="matricula">
									Senha
								</label>
								<InputText
									id="matricula"
									className="w-100 input-form"
									maxLength={10}
								/>
							</div>
							<div className="p-field p-col-12">
								<Button label="Entrar" className="p-button-login w-100" />
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
};
