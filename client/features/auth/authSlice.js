import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null
};

// Register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const res = await axios.post('/api/users', userData);

    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.err.split('.')[0];
    return thunkAPI.rejectWithValue(errorMessage);
  }
});


// Login user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const res = await axios.post('/api/users/login', userData);

    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.err.split('.')[0];
    return thunkAPI.rejectWithValue(errorMessage);
  }
});


// Louout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState
  }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;