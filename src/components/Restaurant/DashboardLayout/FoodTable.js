import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFoodProduct,
  fetchFoodsByRestaurant,
  updateFoodProduct,
} from "../../../redux/slice/restaurant/restaurantSlice";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function FoodTable() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();

  const foods = useSelector((state) => state.restaurants.foods);
  const loading = useSelector((state) => state.restaurant?.loading);
  const error = useSelector((state) => state.restaurant?.error);

  const [editingFoodId, setEditingFoodId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    dispatch(fetchFoodsByRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveUpdatedFood = (foodId) => {
    dispatch(updateFoodProduct({ foodId, updateData: editData })).then(() => {
      dispatch(fetchFoodsByRestaurant(restaurantId)); // Refresh the foods list after a successful update
    });
    setEditingFoodId(null);
    setEditData({});
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodProduct({ foodId })).then(() => {
      dispatch(fetchFoodsByRestaurant(restaurantId));
    });
  };

  if (loading) return <p className="text-center my-4">Loading...</p>;
  if (error)
    return <p className="text-center my-4 text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg text-gray-800">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Total Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Total Sold
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {foods && foods.length > 0 ? (
            foods.map((food) =>
              food._id === editingFoodId ? (
                <tr key={food._id}>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      defaultValue={food.itemName}
                      onChange={(e) =>
                        handleInputChange("itemName", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="number"
                      defaultValue={food.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      defaultValue={food.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="number"
                      defaultValue={food.totalQty}
                      onChange={(e) =>
                        handleInputChange("totalQty", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="number"
                      defaultValue={food.totalSold}
                      onChange={(e) =>
                        handleInputChange("totalSold", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-3 px-6">
                    <button onClick={() => saveUpdatedFood(food._id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingFoodId(null)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={food._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{food.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{food.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{food.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{food.totalQty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{food.totalSold}</td>
                  <td className="py-3 px-6">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-4"
                      onClick={() => {
                        setEditingFoodId(food._id);
                        setEditData({
                          itemName: food.itemName,
                          price: food.price,
                          description: food.description,
                          totalQty: food.totalQty,
                          totalSold: food.totalSold,
                        });
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteFood(food._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="7" className="py-3 px-6 text-center">
                No foods available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FoodTable;
