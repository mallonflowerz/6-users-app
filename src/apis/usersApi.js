import axios from "axios";
import { URL } from "../config/URL";

const usersApis = axios.create({
    baseURL: URL()

})

usersApis.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "Authorization": sessionStorage.getItem('token'),
    }
    return config
})

export default usersApis