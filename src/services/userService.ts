import { BaseUser, User } from 'src/@types/users/types';
import axios from 'src/utils/axios';

const baseUrl = 'contact/';

const getUsers = async () => {
    const users = await axios.get<User[]>(baseUrl);

    return users.data;
};

const getUser = async (id: number) => {
    const user = await axios.get<User>(baseUrl + `${id}/`);

    return user.data;
};

const deleteUser = async (id: number) => {
    await axios.delete(baseUrl + `${id}/`);
};

const createUser = async (model: BaseUser) => {
    await axios.post(baseUrl, model);
};

const updateUser = async (model: BaseUser, id: number) => {
    await axios.put(baseUrl + `${id}/`, model);
};

const userService = {
    getUsers,
    getUser,
    deleteUser,
    createUser,
    updateUser
};

export default userService;
