import { useState, useEffect } from 'react';
import './styles/Module.AdminUsersList.css';
import { useAuth } from '../context_providers/AuthProvider';
import { GET_USERS_ENDPOINT, DELETE_USER_ENDPOINT, UPDATE_USER_ADMIN_ENDPOINT } from '../config';

function AdminUsersList() {
    const { token, user } = useAuth() || { token: null, user: null };
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionToConfirm, setActionToConfirm] = useState(null); // 'delete' o 'toggleRole'
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${GET_USERS_ENDPOINT}`);
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [user]);

    const deleteUser = async (userId) => {
        console.log(`Deleting user ${userId}`);
        try {
            const response = await fetch(`${DELETE_USER_ENDPOINT}${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error al elimiar el usuario: ${response.status}`);
            } else {
                console.log("Usuario eliminado exitosamente");
            }
            fetchUsers();
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    const handleToggleAdmin = async (userToModify) => {
        console.log(userToModify);
        if (user.id === userToModify.id) {
            alert("No puedes cambiar tu propio rol.");
            return;
        }

        setUsers((prevUsers) =>
            prevUsers.map((userInList) =>
                userInList.id === userToModify.id ? { ...userInList, role: userInList.role === "admin" ? "user" : "admin" } : userInList
            )
        );

        const newUser = {
            id: userToModify.id,
            name: "",
            email: "",
            password: "",
            role: userToModify.role === "admin" ? "none" : "admin",
            address: ""
        };

        try {
            console.log("datos enviados",newUser);
            const response = await fetch(UPDATE_USER_ADMIN_ENDPOINT, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });
            console.log("Actualizando rol de usuario...");
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            } else {
                console.log("Rol de usuario actualizado exitosamente");
            }

        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    };

    const handleDeleteUser = async (userToDelete) => {
        await deleteUser(userToDelete.id);
        setUsers((users) => users.filter((user) => user.id !== userToDelete.id));
    };

    const openModal = (action, user) => {
        console.log("token",token)
        console.log(user)
        setActionToConfirm(action);
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActionToConfirm(null);
        setSelectedUser(null);
    };

    const confirmAction = () => {
        console.log("selectedUser",selectedUser)
        if (actionToConfirm === 'delete') {
            handleDeleteUser(selectedUser);
        } else if (actionToConfirm === 'toggleRole') {
            handleToggleAdmin(selectedUser);
        }
        closeModal();
    };

    return (
        <div className="admin-users-list">
            <h2>Usuarios</h2>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Role</th>
                        
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className='user-row'>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>
                                <button
                                    onClick={() => openModal('toggleRole', user)}
                                    className={user.role === 'admin' ? 'admin-button' : 'user-button'}
                                >
                                    {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                </button>
                            </td>
                            
                            <td>
                                <button
                                    onClick={() => openModal('delete', user)}
                                    className='delete-button'
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>¿Estás seguro?</h3>
                        <p>
                            {actionToConfirm === 'delete'
                                ? 'Esta acción eliminará al usuario. ¿Deseas continuar?'
                                : 'Esta acción cambiará el rol del usuario. ¿Deseas continuar?'}
                        </p>
                        <div className="modal-actions">
                            <button onClick={confirmAction} className='big-button primary-button'>
                                Confirmar
                            </button>
                            <button onClick={closeModal} className='big-button secondary-button'>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUsersList;
