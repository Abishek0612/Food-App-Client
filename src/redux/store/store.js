import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slice/restaurant/restaurantSlice";
import customerReducer from "../slice/customers/customerSlice";
import foodProductReducer from "../slice/foodProducts/foodProductsSlice";

//create a store
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    customers: customerReducer,
    foodProducts: foodProductReducer,
  },

});

export default store;
