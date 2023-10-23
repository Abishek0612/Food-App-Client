import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initialState
const customerInitialState = {
  isAuthenticated: false,
  error: null,
  success: null,

  loading: false,
  customers: [],
  customer: null,
  profile: {},
  customerAuth: {
    loading: false, // loading state for authentication
    error: null,
    customerInfo: localStorage.getItem("customerInfo")
      ? JSON.parse(localStorage.getItem("customerInfo"))
      : null,
  },
};

// Customer Action for Restaurants
export const registerCustomerAction = createAsyncThunk(
  "customer/register",
  async ({ name, email, password, phoneNumber }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/v1/customer/register",
        {
          name,
          email,
          password,
          phoneNumber,
        }
      );
      return data;
    } catch (error) {
      rejectWithValue(error?.message?.data);
    }
  }
);

//! Login
export const loginCustomerAction = createAsyncThunk(
  "customer/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/v1/customer/login",
        { email, password }
      );
      // Check if data contains an error property
      if (data.error) {
        return rejectWithValue(data.error);
      }
      localStorage.setItem("customerInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//Slice
const customerSlice = createSlice({
  name: "customer",
  initialState: customerInitialState,

  reducers: {
    clearToastNotifications: (state) => {
      state.success = null;
      state.error = null;
    },
    logoutCustomer: (state) => {
      state.isAuthenticated = false;
      state.customerAuth.customerInfo = null;
    },
  },
  extraReducers: (builder) => {
    //Register
    builder
      .addCase(registerCustomerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(registerCustomerAction.fulfilled, (state, action) => {
        state.customerAuth.customerInfo = action.payload;
        state.loading = false;
        state.success = "Registration successful!";
        state.error = null;
      })
      .addCase(registerCustomerAction.rejected, (state, action) => {
        state.error =
          action.payload?.error || action.payload || "An error occurred";
        state.loading = false;
        state.success = null;
      });

    //login
    builder
      .addCase(loginCustomerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(loginCustomerAction.fulfilled, (state, action) => {
        state.customerAuth.customerInfo = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.success = "Login successful!";
        state.error = null;
      })

      .addCase(loginCustomerAction.rejected, (state, action) => {
        state.error =
          action.payload?.error || action.payload || "An error occurred";
        state.isAuthenticated = false;
        state.loading = false;
        state.success = null;
      });
  },
});
const customerReducer = customerSlice.reducer;

export default customerReducer;
export const { logoutCustomer, clearToastNotifications } =
  customerSlice.actions;
