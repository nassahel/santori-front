const url = `${import.meta.env.VITE_URL}users/`


export const getAllUsers = async () => {
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




export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const user = await fetch(url + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    })
    return user.json()
  } catch (error) {
    return console.log(error);

  }

}