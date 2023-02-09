import { combineReducers } from '@reduxjs/toolkit';
import users from './slices/users';

export const rootReducer = combineReducers({
    users: users
});
