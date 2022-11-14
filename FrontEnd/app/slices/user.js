import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk("user/logIn", async (info, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
  name: "user",
  initialState: {
    userInfo: false,
    loading: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default userSlice.reducer;
