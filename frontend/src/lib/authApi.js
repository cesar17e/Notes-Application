import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5117/auth"
    : "/auth";

const authApi = axios.create({
  baseURL: BASE_URL,
});

// Extract backend error messages cleanly
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage = error?.response?.data?.error;
    error.message = backendMessage || "An unexpected error occurred";
    return Promise.reject(error);
  }
);

export default authApi;
