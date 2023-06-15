import axios from 'axios';

const URL = 'http://localhost:8080';

export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data);
    }
    catch (error) {
        console.log('Error while adding new user: ', error.message);
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${URL}/users`);
        return response.data;
    }
    catch (error) {
        console.log('Error while fetching user: ', error.message);
    }
}

export const addUserDoc = async (data) => {
    try {
        return await axios.post(`${URL}/addDoc`, data);
    }
    catch (error) {
        console.log('Error while adding new user doc: ', error.message);
    }
}

export const getUserDoc = async (data) => {
    try {
        const response = await axios.post(`${URL}/getDocs`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(data);
        return response.data;
    }
    catch (error) {
        console.log('Error while fetching user docs: ', error.message);
    }
}