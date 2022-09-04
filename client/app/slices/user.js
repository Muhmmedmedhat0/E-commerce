import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('user/logIn', async (info, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: false,
    loading: null,
    error: null,
  },
  extraReducers: {
    // add to user
    [logIn.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [logIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [logIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default userSlice.reducer;
