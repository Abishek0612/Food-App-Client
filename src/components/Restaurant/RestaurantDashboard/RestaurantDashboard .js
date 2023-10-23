import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoods, addFood, updateFood, deleteFood } from "./foodSlice";
import { fetchOrders } from "./orderSlice";
import axios from "axios";

const RestaurantDashboard = () => {
  const foods = useSelector((state) => state.foodProducts.foodProducts);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [newFoodData, setNewFoodData] = useState({ name: "", price: "" });

  React.useEffect(() => {
    dispatch(fetchFoods());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCreateFood = async () => {
    const response = await axios.post("/create/food", newFoodData);
    dispatch(addFood(response.data.foodProduct));
    setNewFoodData({ name: "", price: "" });
  };

  const handleUpdateFood = async (updatedFoodData) => {
    const response = await axios.put(`/update-food/${updatedFoodData._id}`, updatedFoodData);
    dispatch(updateFood(response.data.foodProduct));
  };

  const handleDeleteFood = async (foodId) => {
    await axios.delete(`/delete-food/${foodId}`);
    dispatch(deleteFood({ _id: foodId }));
  };

  return (
    <div className="p-4">
      <h3>Create Food</h3>
      <input
        placeholder="Food Name"
        value={newFoodData.name}
        onChange={(e) => setNewFoodData({ ...newFoodData, name: e.target.value })}
      />
      <input
        placeholder="Price"
        value={newFoodData.price}
        onChange={(e) => setNewFoodData({ ...newFoodData, price: e.target.value })}
      />
      <button onClick={handleCreateFood}>Add Food</button>

      <h3>Existing Foods</h3>
      {foods.map((food) => (
        <div key={food._id}>
          <span>{food.name} - ${food.price}</span>
          <button onClick={() => handleUpdateFood(food)}>Update</button>
          <button onClick={() => handleDeleteFood(food._id)}>Delete</button>
        </div>
      ))}

      <h3>Orders</h3>
      {orders.map((order) => (
        <div key={order._id}>
          <h4>Order ID: {order._id}</h4>
          <p>Customer: {order.customerName}</p>
          <p>Items:</p>
          <ul>
            {order.items.map((item) => (
              <li key={item._id}>{item.foodName} - ${item.price}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RestaurantDashboard;
