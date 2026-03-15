import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST || "http://localhost:5000"
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN SENT:", token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  console.log("HEADERS:", req.headers);
  return req;

});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// AUTH APIs
export const createUser = (data) => API.post("/api/auth/createUser", data);
export const loginUser = (data) => API.post("/api/auth/loginUser", data);
export const getUser = () => API.get("/api/auth/getUser");

// PREDICTION API
export const predictNews = (data) =>
  API.post("/api/predictions", data);

