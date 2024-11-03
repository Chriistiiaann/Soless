import { useRef, useState } from "react";
import { validation } from "../utils/validationForm";
import { jwtDecode } from "jwt-decode";
import "./styles/Module.ResgisterLogin.css"
import { LOGIN_ENDPOINT } from "../config"
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/LOGO.png";


function Login() {
	console.log(LOGIN_ENDPOINT)
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [promesaError, setPromesaError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);


	const handleSubmit = (event) => {
		event.preventDefault();

		//Comprobamos que el formato de Email es válido.
		const emailValue = emailRef.current.value;
		if (!validation.isValidEmail(emailValue)) {
			setEmailError("Por favor, introduce un formato de email válido.")
			return;
		} else {
			setEmailError(null);
		}

		//Comprobamos que el formato de Password es válido
		const passwordValue = passwordRef.current.value;
		if (!validation.isValidPassword(passwordValue)) {
			setPasswordError(
				"La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales."
			);
			return;
		} else {
			setPasswordError(null);
		}

		//comprobar datos con console.log
		const objetoBackend = {
			email: emailValue,
			password: passwordValue
		};
		console.log(objetoBackend);

		fetchingData(LOGIN_ENDPOINT, objetoBackend);
		reseteoForm();
	}

	function reseteoForm() {
		emailRef.current.value = "";
		passwordRef.current.value = "";
	}

	async function fetchingData(url, data) {
		try {
			//Establecemos el Loading en true para que muestre cargando mientras
			//se hace la petición
			setIsLoading(true);
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			//Si obetiene los datos del servidor generamos una token para decodificarla
			if (response.ok) {
				const datosPromesa = await response.json();
				console.log(datosPromesa);
				const token = datosPromesa.accessToken;
				console.log(token)
				const decodedToken = jwtDecode(token);
				console.log(decodedToken);
				//Si se ha decodificado sin problema vemos la info del usuario
				if (decodedToken) {
					const userInfo = {
						name: decodedToken.Name,
						role: decodedToken.role,
					};
					console.log("userInfo", userInfo);
				}
				setPromesaError(null);
			} else {
				setPromesaError("error server")
			}
		} catch (error) {
			console.log(error);
			setPromesaError(`error server ${error}`);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="container-log">
			<div className="left-panel-log">
				<h2>SOLESS</h2>
				<form>
					<h1>Inicia Sesión</h1>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="Email"
						required
						ref={emailRef}
					/>
					{/*Si hay un error lo mostramos*/}
					{emailError && <p>{emailError}</p>}
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Contraseña"
						required
						ref={passwordRef}
					/>
					{passwordError && <p>{passwordError}</p>}
					<div>
						<a href="/Register">¿Has olvidado tu contraseña?</a>
					</div>
					<button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Cargando..." : "Entrar"}
					</button>
					{promesaError && <p>{promesaError}</p>}
					<div>
						¿No tienes cuenta?<Link to={"/Register"}> Regístrate</Link>
					</div>
				</form>
			</div>
			<div className="right-panel-log">
				<div className="logoLogin">
					<img src={logo} alt="Logo" className="logo1" />
					<img src={logo} alt="Logo" className="logo2"/>
					<img src={logo} alt="Logo" className="logo3"/>
				</div>
			</div>
		</div>
	);
}
export default Login;
