import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cards: []
}

// Loading cards
export const loadCards = createAsyncThunk('cards/loadCards', async (_, thunkAPI) => {
  try {
    const token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.get('/api/cards', config);

    return res.data
  } catch (error) {
    console.log(error);
    const errorMessage = err.res.data.err.split('.')[0];
    return thunkAPI.rejectWithValue(errorMessage);
  } 
})

// Create new card
export const createCard = createAsyncThunk('cards/createCard', async (cardData) => {
  try {
    const token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.post('/api/cards', cardData, config);

    return res.data;
  } catch (error) {
    console.log(error)
  }
})

// Update card
export const updateCard = createAsyncThunk('cards/updateCard', async (id) => {
  try {
    const token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.post(`/api/cards/${id}`, config);

    return res.data;
  } catch (error) {
    console.log(error)
  }
})

// Delete card
export const deleteCard = createAsyncThunk('cards/deleteCard', async (cardData) => {
  try {
    const token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.post(`/api/cards/${id}`, cardData, config);

    return res.data;
  } catch (error) {
    console.log(error)
  }
})

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    reset: (state) => initialState
  }
});

export const { reset } = cardsSlice.actions;
export default cardsSlice.reducer;