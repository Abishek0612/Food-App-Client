import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  foodProducts: [],
  singleProduct: null,
};

//! All food products of all restaurant displaying in home page
export const fetchFoodProducts = createAsyncThunk(
  "foodProducts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:7000/api/v1/restaurant/get-all-foodproduct"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action for fetching a single food product by ID

//? Single food product using id
export const fetchSingleProduct = createAsyncThunk(
  "foodProducts/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:7000/api/v1/restaurant/get/food/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const foodProductSlice = createSlice({
  name: "foodProducts",
  initialState,
  reducers: {
    addFoodProduct: (state, action) => {
      state.foodProducts.push(action.payload);
    },
    updateFoodProduct: (state, action) => {
      const index = state.foodProducts.findIndex(
        (food) => food._id === action.payload._id
      );
      if (index !== -1) {
        state.foodProducts[index] = action.payload;
      }
    },
    deleteFoodProduct: (state, action) => {
      state.foodProducts = state.foodProducts.filter(
        (food) => food._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.foodProducts = action.payload.foodProducts;
        state.error = null;
      })
      .addCase(fetchFoodProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //Single product
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.foodProduct;
        state.error = null;
      })

      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.singleProduct = null;
      });
  },
});

const foodProductReducer = foodProductSlice.reducer;
export default foodProductReducer;
