import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slice/restaurant/restaurantSlice";
import customerReducer from "../slice/customers/customerSlice";

//create a store
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    customers: customerReducer,
  },

});

export default store;
