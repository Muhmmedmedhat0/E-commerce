import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(sessionStorage?.getItem('persist:user'))?.userInfo;
const currentUser = user && JSON.parse(user);
const TOKEN = currentUser?.token;

//fetchProducts
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch('http://localhost:8080/api/products/', {
        method: 'GET',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await response.json();
      return data.products;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// deleteProduct
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:8080/api/products/${_id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      return _id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: null,
    error: null,
  },
  extraReducers: {
    // get all products
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // deleteProducts
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.splice(
        state.products.findIndex(
          (product) => product._id === action.payload._id
        ),
        1
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
