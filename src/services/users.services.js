export const getAllUsers = async () => {
  const url = `${import.meta.env.VITE_URL}users`
  const token = localStorage.getItem('token');
  const users = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  })
  return users.json()
}