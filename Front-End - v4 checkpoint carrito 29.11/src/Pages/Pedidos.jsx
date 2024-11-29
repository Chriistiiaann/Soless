import { useEffect, useState } from 'react';
import ListaPedidos from '../components/ListaPedidos';
import  { ORDERS_BY_USER } from '../config';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPedidos = async () => {
        const userData = localStorage.getItem('user');
        
        if (!userData) {
            console.error('No se encontró información del usuario en el localStorage');
            setLoading(false);
            return;
        }

        const user = JSON.parse(userData); 
        const userId = user.id;

        try {
            const response = await fetch(ORDERS_BY_USER + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (!response.ok) {
            throw new Error('Error al obtener los pedidos');
            }

            const data = await response.json();
            setPedidos(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchPedidos();
    }, []);

    return (
        <div>
        {loading ? <p>Cargando pedidos...</p> : <ListaPedidos pedidos={pedidos} />}
        </div>
    );
};

export default Pedidos;