import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//!Async action to place an order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log("Attempting to place order with data:", orderData);
      const response = await axios.post(
        "http://localhost:7000/api/v1/order/place-order",
        orderData
      );
      console.log("Order response:", response.data);
      return response.data;
    } catch (err) {
      let errorData;
      if (err.response) {
        errorData = err.response.data;
      } else {
        errorData = "Unknown error occurred. Please try again.";
      }
      return rejectWithValue(errorData);
    }
  }
)


const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    //!place order
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const orderReducer = orderSlice.reducer;

export default orderReducer;
