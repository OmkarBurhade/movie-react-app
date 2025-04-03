import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        accept: import.meta.env.VITE_API_ACCEPT,
        Authorization: import.meta.env.VITE_API_AUTHORIZATION
    }
});

export default instance;
