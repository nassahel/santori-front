const url = `${import.meta.env.VITE_URL}products/`

export const menuesByCateogry = async (category) => {
  try {
    const response = await fetch(url + category);
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos del servidor');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en menuesByCateogry:', error);
    throw error;
  }
};

export const getMenus = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos del servidor');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getMenus:', error);
    throw error;
  }
};
