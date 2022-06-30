import axios from "axios"

const baseURL = 'http://localhost:5050/comments';

export const userComment = async (eventID, body, token) => {
  try {
    const response = await axios.post(`${baseURL}/${eventID}`, body , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const comment = response.data;
    return comment;

  } catch (err) {
    return err;
  }
}