import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  message: ''
};

// Register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    console.log('before register');
    const res = await axios.post('/api/users', userData);
    console.log('after register');

    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
  } catch (error) {
    console.log(error);
    const message = error.response.data.err.split('.')[0];
    return thunkAPI.rejectWithValue(message);
  }
});


// Login user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    console.log('before login');    
    const res = await axios.post('/api/users/login', userData);
    console.log('before login');

    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }

    console.log('res.data from login')
    console.log(res.data)

    return res.data;
  } catch (error) {
    console.log(error);
    const message = error.response.data.err.split('.')[0];
    return thunkAPI.rejectWithValue(message);
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