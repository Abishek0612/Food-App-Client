import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//initialState

const initialRestaurantState = {
  isAuthenticated: localStorage.getItem("restaurantInfo") ? true : false,
  loading: false,
  error: null,
  success: null,
  foods: [], // To store list of food items
  food: null,
  foodStatus: "idle", // Status for food operations: idle, pending, success, error
  foodError: null, // Any error messages related to food operations
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

// !Fetch food products by a specific restaurant
export const fetchFoodsByRestaurant = createAsyncThunk(
  "restaurant/fetch-Food-ByRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("restaurantInfo")
        ? JSON.parse(localStorage.getItem("restaurantInfo")).token
        : null;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.get(
        `http://localhost:7000/api/v1/restaurant/get-restaurant-food/${restaurantId}`,
        { headers }
      );
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async action for adding a food item
export const addFoodItem = createAsyncThunk(
  "restaurant/add-food-item",
  async (foodData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("restaurantInfo")
        ? JSON.parse(localStorage.getItem("restaurantInfo")).token
        : null;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        "http://localhost:7000/api/v1/restaurant/create/food",
        foodData,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//! Async action for Updating a food item
export const updateFoodProduct = createAsyncThunk(
  "restaurant/update-food-product",
  async ({ foodId, updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("restaurantInfo")
        ? JSON.parse(localStorage.getItem("restaurantInfo")).token
        : null;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://localhost:7000/api/v1/restaurant/update-food/${foodId}`,
        updateData,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

//? Async action to Delete a food item
export const deleteFoodProduct = createAsyncThunk(
  "restaurant/delete-food-product",
  async ({ foodId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("restaurantInfo")
        ? JSON.parse(localStorage.getItem("restaurantInfo")).token
        : null;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `http://localhost:7000/api/v1/restaurant/delete-food/${foodId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
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

    //!FetchFoodsByRestauran
    builder
      .addCase(fetchFoodsByRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFoodsByRestaurant.fulfilled, (state, action) => {
        // console.log("Action Payload:", action.payload);
        state.foods = action.payload.foodProducts;
        state.loading = false;
      })
      .addCase(fetchFoodsByRestaurant.rejected, (state, action) => {
        state.error =
          action.payload?.error || action.payload || "An error occurred";
        state.loading = false;
        state.success = null;
      });

    // ? Adding a food item
    builder
      .addCase(addFoodItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFoodItem.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.food = action.payload;
      })

      .addCase(addFoodItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //!  Updating a food item
    builder
      .addCase(updateFoodProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateFoodProduct.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        // Find the index of the updated food item in the foods array
        const index = state.foods.findIndex(
          (food) => food._id === action.payload.foodProduct._id
        );

        //  food item exists in the array, updateing it
        if (index !== -1) {
          state.foods[index] = action.payload.foodProduct;
        }

        // using state.food for some purpose, set it to the updated food product
        state.food = action.payload.foodProduct;
      })
      .addCase(updateFoodProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // ? Delete food product
    builder
      .addCase(deleteFoodProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFoodProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted food from the state
        state.foods = state.foods.filter((food) => food._id !== action.payload);
      })
      .addCase(deleteFoodProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const restaurantReducer = restaurantSlice.reducer;

export default restaurantReducer;
export const { logoutRestaurant, clearState } = restaurantSlice.actions;
