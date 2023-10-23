import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  foodProducts: [],
};

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

const foodProductSlice = createSlice({
  name: "foodProducts",
  initialState,
  reducers: {},
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
  },
});

const foodProductReducer = foodProductSlice.reducer;
export default foodProductReducer;
