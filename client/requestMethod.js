import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const userToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token

console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser);
const TOKEN = userToken

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header : {token: `Bearer ${TOKEN}`}
})