import axios from "axios";
let url = "http://localhost:3000/countries";
if (process.env.NODE_ENV === "production") {
  url = "/countries";
}
export const apiAPI = axios.create({
  baseURL: url,
});
