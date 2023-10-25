import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slice/restaurant/restaurantSlice";
import customerReducer from "../slice/customers/customerSlice";
import foodProductReducer from "../slice/foodProducts/foodProductsSlice";
import orderReducer from "../slice/orders/ordersSlice";
import cartReducer from "../slice/Cart/cartSlice";

//create a store
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    customers: customerReducer,
    foodProducts: foodProductReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;
