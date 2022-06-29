import axios from "axios"

const baseURL = 'http://localhost:5050/users';

export const loginUser = async (userLogin) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userLogin);
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

export const createNewUser = async (newUser) => {
  try {
    const response = await axios.post(`${baseURL}/create-user`, newUser);
    const user = response.data;
    return user;

  } catch (err) {
    return err;
  }
}

export const logoutUser = async (token) => {
  await axios.post(`${baseURL}/logout`, null , {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}