import { createSlice } from '@reduxjs/toolkit';
import { BaseUser, UsersInitialState } from 'src/@types/users/types';
import { dispatch } from '../store';
import userService from 'src/services/userService';

const initialState: UsersInitialState = {
    isLoading: false,
    users: null,
    error: null
}

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearState(state) {
            state.isLoading = false;
            state.users = null;
            state.error = null;
        },

        startLoading(state) {
            state.isLoading = true;
        },

        finishLoading(state) {
            state.isLoading = false;
        },

        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getUsersSuccess(state, action) {
            state.isLoading = false;
            state.users = action.payload;
        },

        getUsersFailed(state, action) {
            state.isLoading = false;
            state.users = initialState.users;
            state.error = action.payload;
        }
    }
});

export default slice.reducer;

export async function getUsers() {
    try {
        dispatch(slice.actions.startLoading());
        const users = await userService.getUsers();
        dispatch(slice.actions.getUsersSuccess(users));
    } catch (error) {
        dispatch(slice.actions.getUsersFailed(error));
    }
}

export async function getUser(id: any) {
    try {
        dispatch(slice.actions.startLoading());
        const data = await userService.getUser(id);
        dispatch(slice.actions.finishLoading());
        return data;
    } catch (error) {
        throw error;
    }
}

export async function createUser(user: BaseUser) {
    try {
        dispatch(slice.actions.startLoading());
        await userService.createUser(user);
        dispatch(slice.actions.finishLoading());
    } catch (error) {
        throw error;
    }
}

export async function updateUser(user: BaseUser, id: any) {
    try {
        dispatch(slice.actions.startLoading());
        await userService.updateUser(user, id);
        dispatch(slice.actions.finishLoading());
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(id: number) {
    try {
        dispatch(slice.actions.startLoading());
        await userService.deleteUser(id);
        dispatch(slice.actions.finishLoading());
    } catch (error) {
        throw error;
    }
}
