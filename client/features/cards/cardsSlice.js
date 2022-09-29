import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cards: [],
  message: ''
};

// Loading cards
export const loadCards = createAsyncThunk('cards/loadCards', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth;
    console.log(token);
    // const config = {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // };

    // const res = await axios.get('/api/cards', config);

    // return res.data;
  } catch (error) {
    console.log(error);
    const message = error.response.data.err.split('.')[0];
    return thunkAPI.rejectWithValue(message);
  } 
});

// Create new card
export const createCard = createAsyncThunk('cards/createCard', async (cardData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.post('/api/cards', cardData, config);

    return res.data;
  } catch (error) {
    console.log(error);
    const message = error.response.data.err.split('.')[0];
    return thunkAPI.rejectWithValue(message);
  }
});

// Update card
export const updateCard = createAsyncThunk('cards/updateCard', async (cardData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.patch(`/api/cards/${cardData._id}`, cardData, config);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Delete card
export const deleteCard = createAsyncThunk('cards/deleteCard', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.delete(`/api/cards/${id}`, config);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    reset: (state) => initialState
  }
});

export const { reset } = cardsSlice.actions;
export default cardsSlice.reducer;