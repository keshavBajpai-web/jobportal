import axios from "axios";

const Api = axios.create({
    baseURL:"https://jobportal-y9i2.onrender.com/api/v1"
})

export default Api
