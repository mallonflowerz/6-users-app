import axios from "axios";
import { URL } from "../../config/URL";

const BASE_URL = URL() + "/login";

export const loginUser = async ({username, password}) => {
    try {
        return await axios.post(BASE_URL, {
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
}