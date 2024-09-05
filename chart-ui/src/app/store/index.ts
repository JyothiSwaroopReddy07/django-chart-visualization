// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import chartReducer from './chartSlice';
import React from 'react';

export const store = configureStore({
    reducer: {
        charts: chartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
