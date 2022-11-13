import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// get products from server and store them in the store
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        category
          ? `http://localhost:8080/api/products?category=${category}`
          : 'http://localhost:8080/api/products'
      );
      const data = await response.json();
      return data.products;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
// get product by id
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`http://localhost:8080/api/products/find/${id}`);
      const data = await response.json();
      // console.log(data.product);
      return data.product;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// create slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    // get al products
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get single product
    [fetchProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
// export reducer
export default productsSlice.reducer;
