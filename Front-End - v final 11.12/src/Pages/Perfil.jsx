import { useEffect, useState } from 'react';
import './styles/Module.Perfil.css';
import { useAuth } from "../context_providers/AuthProvider";
import { UPDATE_USER_ENDPOINT } from '../config';

export default function Perfil() {
    const { user, updateUserData } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const [ name , setName ] = useState(user.name);
    const [ email , setEmail ] = useState(user.email);
    const [ address , setAddress ] = useState(user.address);
    const [ password , setPassword ] = useState("");

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
        setPassword(user.password);
    }, [user]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "address") {
            setAddress(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setIsEditing(false);
            updateUser();
            alert('Perfil actualizado con exito');
            
        }
    };

    

    const updateUser = async () => {

        const newUser = {
            id: user.id,
            name: name,
            email: email,
            password: password || "",
            role: "",
            address: address
        };

        try {
            const response = await fetch(UPDATE_USER_ENDPOINT, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            console.log(newUser)
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            updateUserData({ ...newUser, role: user.role });
            
            console.log("Antiguo usuario:", user)
            console.log("Nuevo usuario:", newUser)
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    };
    

    return (
        <div className="container-perfil">
            <div className="container-form">
                <h1 className="title">Mi Perfil</h1>
                <h3 className='role'>Role: <span className={user.role == "admin" ? "admin" : "user"}>{user.role}</span></h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={isEditing ? "while-editing" : ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={isEditing ? "while-editing" : ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Dirección</label>
                        <input
                            id="address"
                            name="address"
                            value={address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={isEditing ? "while-editing" : ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            placeholder='Nueva contraseña'
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={isEditing ? "while-editing" : ''}
                        />
                    </div>
                    <div className="buttons-container">
                        {/* {isEditing ? (
                            <button
                                type="submit"
                                className="big-button primary-button save-profile-button"
                            >
                                Save Changes
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="big-button primary-button edit-profile-button"
                                onClick={() => {setIsEditing(true); console.log("Editing")}}
                            >
                                Edit Profile
                            </button>
                        )} */}
                        <button
                            type="submit"
                            className="big-button primary-button save-profile-button"
                        >
                            Guardar cambios
                        </button>
                        <button
                            type="button"
                            className="big-button primary-button edit-profile-button"
                            onClick={() => {setIsEditing(true); console.log("Editing")}}
                        >
                            Editar perfil
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
