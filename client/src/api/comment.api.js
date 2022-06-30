import axios from "axios";

const baseURL = "http://localhost:5050/comments";

export const userComment = async (eventID, body, token) => {
  try {
    const response = await axios.post(`${baseURL}/${eventID}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const comment = response.data;
    return comment;
  } catch (err) {
    return err;
  }
};
export const allCommentsPerEvent = async (eventID, body) => {
  try {

    const { data } = await axios.get(`${baseURL}/${eventID}`);

    return data;
  } catch (err) {
    return err;
  }
};
