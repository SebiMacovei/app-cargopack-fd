import axios from "axios";

const url = "http://127.0.0.1:3000"
const config = {
    headers: {
        "Content-Type": "application/json",
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

