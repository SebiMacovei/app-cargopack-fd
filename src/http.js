import axios from "axios";
import {jwtDecode} from "jwt-decode";

const url = import.meta.env.VITE_API_URL;
if (localStorage.getItem("token")) {
    const decoded = jwtDecode(localStorage.getItem("token"));
    if (decoded.exp <= Math.floor(new Date().getTime() / 1000)) {
        localStorage.removeItem("token")
    }
}
const config = {
    headers: {
        // "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
    }
}

//Solving the delay error problem
axios.interceptors.request.use(function (config) {
    return config;
}, null, { synchronous: true });

export function doPost(endpoint, data) {
    return axios.post(url + endpoint, data, config)
}

export function doPatch(endpoint, data) {
    return axios.patch(url + endpoint, data, config)
}

export function doGet(endpoint) {
    return axios.get(url + endpoint, config)
}

export function doDestroy(endpoint) {
    return axios.delete(url + endpoint, config)
}

