import { useRef, useState } from "react";
import { validation } from "../utils/validationForm";
import { jwtDecode } from "jwt-decode";
import "./styles/Module.ResgisterLogin.css";
import { LOGIN_ENDPOINT } from "../config";
import { useNavigate } from "react-router-dom";  
import { useAuth } from "../context_providers/AuthProvider";  // Importa el hook del contexto
import logo from "../img/LOGO.png";
import { Link } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [promesaError, setPromesaError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailValue = emailRef.current.value;
        if (!validation.isValidEmail(emailValue)) {
            setEmailError("Por favor, introduce un formato de email válido.");
            return;
        } else {
            setEmailError(null);
        }

        const passwordValue = passwordRef.current.value;
        if (!validation.isValidPassword(passwordValue)) {
            setPasswordError(
                "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales."
            );
            return;
        } else {
            setPasswordError(null);
        }

        const objetoBackend = {
            email: emailValue,
            password: passwordValue
        };

        fetchingData(LOGIN_ENDPOINT, objetoBackend);
        reseteoForm();
    };

    function reseteoForm() {
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    async function fetchingData(url, data) {
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const datosPromesa = await response.json();
                const token = datosPromesa.accessToken;
                const decodedToken = jwtDecode(token);

                if (decodedToken) {
                    const userInfo = {
                        id: decodedToken.Id,
                        name: decodedToken.Name,
                        email: decodedToken.Email,
                        role: decodedToken.role,
                        address: decodedToken.Address
                    };

                    login(userInfo, token);
                }

                setPromesaError(null);
            } else {
                setPromesaError("error server");
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
                <Link to={`/`}>
                    <h2>SOLESS</h2>
                </Link>
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
                    <button onClick={handleSubmit} disabled={isLoading} className="big-button primary-button">
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
                    <img src={logo} alt="Logo" className="logo2" />
                    <img src={logo} alt="Logo" className="logo3" />
                </div>
            </div>
        </div>
    );
}

export default Login;