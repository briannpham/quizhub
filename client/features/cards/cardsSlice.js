import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cards: [],
  message: ''
};

// Loading cards
export const loadCards = createAsyncThunk('cards/loadCards', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    console.log('token in cardsSlice.loadCards');
    console.log(token);
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.get('/api/cards', config);

    return res.data;
  } catch (error) {
    console.log('error in cardsSlice.loadCards');
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

    console.log('in cardsSlice.createCards')
    console.log(cardData);
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
    console.log(id);
    console.log(res.data);

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
  },
  extraReducers(builder) {
    builder
      .addCase(loadCards.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.cards.unshift(action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const card = state.cards.find(card => card._id === action.payload._id);
        if (card) {
          card.question = action.payload.question;
          card.answer = action.payload.answer;
          card.status = action.payload.status;
          card.favorite = action.payload.favorite;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter(card => card._id !== action.payload._id);
      });
  }
});

export const { reset } = cardsSlice.actions;
export default cardsSlice.reducer;