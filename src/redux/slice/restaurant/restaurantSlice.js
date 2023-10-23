import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//initialState

const initialRestaurantState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  success: null,
  restaurants: [],
  restaurant: null,
  profile: {},
  restaurantAuth: {
    loading: false, // loading state for authentication
    error: null,
    restaurantInfo: localStorage.getItem("restaurantInfo")
      ? JSON.parse(localStorage.getItem("restaurantInfo"))
      : null,
  },
};

// Register Action for Restaurants
export const restaurantRegisterAction = createAsyncThunk(
  "restaurant/register",
  async (
    { restaurantName, email, address, password, openingTime, closingTime },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/restaurant/register",
        {
          restaurantName,
          email,
          address,
          password,
          openingTime,
          closingTime,
        }
      );

      // Check if response is not in the 2xx range
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      console.log("Axios Error:", error?.response?.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Login Action for Restaurants

export const loginRestaurantAction = createAsyncThunk(
  "restaurant/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/v1/restaurant/login",
        { email, password }
      );

      // Check if data contains an error property
      if (data.error) {
        return rejectWithValue(data.error);
      }
      localStorage.setItem("restaurantInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: initialRestaurantState,
  reducers: {
    clearToastNotifications: (state) => {
      state.success = null;
      state.error = null;
    },
    logoutRestaurant: (state) => {
      state.isAuthenticated = false;
      state.restaurantAuth.restaurantInfo = null;
    },
  },
  extraReducers: (builder) => {
    //Register
    builder
      .addCase(restaurantRegisterAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(restaurantRegisterAction.fulfilled, (state, action) => {
        state.restaurantAuth.restaurantInfo = action.payload;
        state.loading = false;
        state.success = action.payload?.message;
      })

      .addCase(restaurantRegisterAction.rejected, (state, action) => {
        state.error =
          action.payload?.error || action.payload || "An error occurred";
        state.loading = false;
        state.success = null;
      })

      //login
      .addCase(loginRestaurantAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(loginRestaurantAction.fulfilled, (state, action) => {
        state.restaurantAuth.restaurantInfo = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.success = action.payload?.message;
        state.error = null;
      })

      .addCase(loginRestaurantAction.rejected, (state, action) => {
        state.error =
          action.payload?.error || action.payload || "An error occurred";
        state.loading = false;
        state.success = null;
      });
  },
});

const restaurantReducer = restaurantSlice.reducer;

export default restaurantReducer;
export const { logoutRestaurant, clearState } = restaurantSlice.actions;
