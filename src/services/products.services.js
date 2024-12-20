const url = `${import.meta.env.VITE_URL}products/`

export const menuesByCateogry = async (category) => {
  const response = await fetch(url + category);
  if (!response.ok) {
    throw new Error('No se pudo obtener los datos del servidor');
  }
  return await response.json();
};


export const getMenus = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  })
  return response.json()

}
