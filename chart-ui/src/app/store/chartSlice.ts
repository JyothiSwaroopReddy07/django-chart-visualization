// src/store/chartSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';
import React from 'react';

// Load environment variables from .env file
dotenv.config();

interface ChartData {
    labels?: string[];
    data?: any;
}

interface ChartState {
    candlestick: ChartData | null;
    line: ChartData | null;
    bar: ChartData | null;
    pie: ChartData | null;
    loading: boolean;
    error: string | null;
}

const initialState: ChartState = {
    candlestick: null,
    line: null,
    bar: null,
    pie: null,
    loading: false,
    error: null,
};

// Retrieve backend URL from environment variables
const BACKEND_PUBLIC_URL = "http://localhost:8000";

export const fetchCandlestickData = createAsyncThunk('charts/fetchCandlestickData', async () => {
    const response = await axios.get(`${BACKEND_PUBLIC_URL}/api/candlestick-data/`);
    return response.data;
});

export const fetchLineData = createAsyncThunk('charts/fetchLineData', async () => {
    const response = await axios.get(`${BACKEND_PUBLIC_URL}/api/line-chart-data/`);
    return response.data;
});

export const fetchBarData = createAsyncThunk('charts/fetchBarData', async () => {
    const response = await axios.get(`${BACKEND_PUBLIC_URL}/api/bar-chart-data/`);
    return response.data;
});

export const fetchPieData = createAsyncThunk('charts/fetchPieData', async () => {
    const response = await axios.get(`${BACKEND_PUBLIC_URL}/api/pie-chart-data/`);
    return response.data;
});

const chartSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCandlestickData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCandlestickData.fulfilled, (state, action) => {
                state.loading = false;
                state.candlestick = action.payload;
            })
            .addCase(fetchCandlestickData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch candlestick data';
            })
            .addCase(fetchLineData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLineData.fulfilled, (state, action) => {
                state.loading = false;
                state.line = action.payload;
            })
            .addCase(fetchLineData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch line chart data';
            })
            .addCase(fetchBarData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBarData.fulfilled, (state, action) => {
                state.loading = false;
                state.bar = action.payload;
            })
            .addCase(fetchBarData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch bar chart data';
            })
            .addCase(fetchPieData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPieData.fulfilled, (state, action) => {
                state.loading = false;
                state.pie = action.payload;
            })
            .addCase(fetchPieData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch pie chart data';
            });
    },
});

export default chartSlice.reducer;
