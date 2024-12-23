import { jwtDecode } from 'jwt-decode';

export const getLoggedUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }

        const decoded = jwtDecode(token);
        if (!decoded || !decoded.userId) {
            console.error('Token inválido o no contiene ID de usuario');
            // console.log(decoded);
            return null;
        }

        const url = `${import.meta.env.VITE_URL}users/${decoded.userId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error(`Error al obtener los datos del usuario: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getLoggedUserData:', error.message);
        return null;
    }
};
