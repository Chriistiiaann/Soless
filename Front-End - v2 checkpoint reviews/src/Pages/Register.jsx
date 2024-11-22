import { useState, useRef } from "react";
import { validation } from "../utils/validationForm";
import "./styles/Module.ResgisterLogin.css"
import { REGISTER_ENDPOINT } from "../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../img/LOGO.png";
import { useAuth } from "../context_providers/AuthProvider"; 


function Register() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmPasswordRef = useRef(null);
	const nameRef = useRef(null);
	const addressRef = useRef(null);
	const navigate = useNavigate();

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [promesaError, setPromesaError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth(); 


	const handleRegister = (event) => {
		event.preventDefault();
		
		const emailValue = emailRef.current.value;
		const passwordValue = passwordRef.current.value;
		const confirmPassword = confirmPasswordRef.current.value;
		const nameValue = nameRef.current.value;
		const addressValue = addressRef.current.value;

		// Validación de campos
		if (!validation.isValidEmail(emailValue)) {
			setEmailError("Por favor, introduce un formato de email válido.");
			return;
		} else {
			setEmailError(null);
		}

		if (!validation.isValidPassword(passwordValue)) {
			setPasswordError(
				"La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales."
			);
			return;
		} else {
			setPasswordError(null);
		}

		if (passwordValue !== confirmPassword) {
			setPasswordError("Las contraseñas no coinciden");
			return;
		} else {
			setPasswordError(null);
		}

	
		const userData = {
			name: nameValue,
			address: addressValue,
			email: emailValue,
			password: passwordValue,
			role: "none" 
		};

		console.log(userData);
		fetchingDataRegister(REGISTER_ENDPOINT, userData);
		reseteoForm();
	};

	function reseteoForm() {
		emailRef.current.value = "";
		passwordRef.current.value = "";
		confirmPasswordRef.current.value = "";
		nameRef.current.value = "";
		addressRef.current.value = "";
	}

	async function fetchingDataRegister(url, data) {
		try {
			setIsLoading(true);
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			console.log("Response status:", response.status);

			if (response.ok) {
				const datosPromesa = await response.json();
				console.log("Usuario registrado con éxito:", datosPromesa);
				setPromesaError(null);
				
				navigate("/");
			} else {
				const errorResponse = await response.json();
				console.log("Error en la respuesta del servidor:", errorResponse);
				setPromesaError("Error al registrar al usuario");
			}
		} catch (error) {
			console.error("Error en fetch:", error);
			setPromesaError(`Error al registrar usuario: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="container-reg">
			<div className="right-panel">
				<Link to={`/`}>
				<h2>SOLESS</h2>
				</Link>
				<form onSubmit={handleRegister}>
					<h1>Regístrate</h1>
					<input
						id="name"
						name="nameRegister"
						type="text"
						placeholder="Nombre"
						ref={nameRef}
						required
					/>
					<input
						id="address"
						name="addressRegister"
						type="text"
						placeholder="Dirección"
						ref={addressRef}
						required
					/>
					<input
						id="email2"
						name="emailRegister"
						type="email"
						placeholder="Email"
						ref={emailRef}
						required
					/>
					<input
						id="password2"
						name="passwordRegister"
						type="password"
						placeholder="Contraseña"
						ref={passwordRef}
						required
					/>
					<input
						id="confirmPassword"
						type="password"
						placeholder="Confirmar contraseña"
						ref={confirmPasswordRef}
						required
					/>
					{emailError && <p>{emailError}</p>}
					{passwordError && <p>{passwordError}</p>}
					{promesaError && <p>{promesaError}</p>}
					{isLoading && <p>Cargando...</p>}
					<button className="primary-button">Crear</button>
					<div>
						¿Ya tienes una cuenta?<Link to={"/Login"}> Entrar</Link>
					</div>
				</form>
			</div>
			<div className="left-panel">
				<img src={logo} alt="Logo" className="logoRegistro" />
			</div>
		</div>
	);
}

export default Register;
