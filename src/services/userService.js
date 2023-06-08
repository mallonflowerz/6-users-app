import axios from "axios"
import { URL } from "../config/URL";
import usersApis from "../apis/usersApi";

const BASE_URL = URL() + "/users";

// const config = () => {
//     return {
//         headers: {
//             "Authorization": sessionStorage.getItem('token'),
//             "Content-Type": "application/json",
//         }
//     }
// }

export const findAll = async() => {
    try {
        const response = await usersApis.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
    return null;
}

export const save = async ({ username, email, password, admin }) => {
    try {
        return await usersApis.post(BASE_URL, {
            username,
            email,
            password,
            admin,
        });
    } catch (error) {
        throw error;
    }
}

export const changePassword = async ({username, usernameNew, password}) => {
    try {
        return await usersApis.put(BASE_URL+"/changePassword", {
            username,
            usernameNew,
            password
        })
    } catch (error) {
        throw error;
    }
}

export const update = async({ id, username, email, admin }) => {
    try {
        return await usersApis.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin,
        });
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await usersApis.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}