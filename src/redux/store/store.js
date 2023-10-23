import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slice/restaurant/restaurantSlice";
import customerReducer from "../slice/customers/customerSlice";
import foodProductReducer from "../slice/foodProducts/foodProductsSlice";
import orderReducer from "../slice/orders/ordersSlice";

//create a store
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    customers: customerReducer,
    foodProducts: foodProductReducer,
    orders:orderReducer
  },

});

export default store;
