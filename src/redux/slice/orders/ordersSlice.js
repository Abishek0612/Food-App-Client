// orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get("/getOrders");
  return response.data.order;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchOrders.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

const orderReducer = orderSlice.reducer
export default orderReducer;


