import axios from "axios";


export const axoisInstance = axios.create({
    baseURL: "https://apus-ecommerce-api.onrender.com/api/"
});
