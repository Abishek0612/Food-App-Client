import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodItem } from "../../../redux/slice/restaurant/restaurantSlice";

const AddFood = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [totalQty, setTotalQty] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const foodData = {
      itemName,
      price,
      description,
      totalQty,
    };
    dispatch(addFoodItem(foodData));
    setItemName("");
    setPrice("");
    setDescription("");
    setTotalQty("");
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Add Food Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="itemName"
            >
              Item Name
            </label>
            <input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
              className="w-full p-3 border rounded-md outline-none transition duration-150 ease-in-out focus:border-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-3 border rounded-md outline-none transition duration-150 ease-in-out focus:border-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="price"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 border rounded-md outline-none transition duration-150 ease-in-out focus:border-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="price"
            >
              TotalQty
            </label>
            <input
              id="totalQty"
              type="number"
              value={totalQty}
              onChange={(e) => setTotalQty(e.target.value)}
              placeholder="TotalQty"
              className="w-full p-3 border rounded-md outline-none transition duration-150 ease-in-out focus:border-indigo-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 transition duration-150 ease-in-out"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
