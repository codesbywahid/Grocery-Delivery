import axios from "axios"

const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL
})

//Injest JWT token from local storage into every request 