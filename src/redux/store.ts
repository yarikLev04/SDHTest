import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { TypedUseSelectorHook, useSelector as useAppSelector } from 'react-redux';

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;

const { dispatch } = store;

const  useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, useSelector };
