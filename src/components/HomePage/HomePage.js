import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodProducts } from "../../redux/slice/foodProducts/foodProductsSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, error, foodProducts } = useSelector((state) => state.foodProducts);

  useEffect(() => {
    dispatch(fetchFoodProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Food Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        { Array.isArray(foodProducts) && foodProducts.map((product) => (
          <div 
            key={product._id} 
            className="border p-4 rounded-lg shadow hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:bg-indigo-50"
          >
            <img src={product.picture || "default-placeholder-image-url"} alt={product.itemName} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-indigo-600">Food Title : {product.itemName}</h2>
            <p className="text-gray-600 mb-2">Food Description: {product.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <h2 className="text-gray-700 hover:text-indigo-600">Restaurant: {product.restaurantName || "Unknown Restaurant"}</h2>
              <span className="text-lg font-bold text-indigo-600">Rs {product.price}</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
            <h2 className="text-gray-700 hover:text-indigo-600">Opening Time: {product.openingTime || "Unknown"}</h2>
              <span className="text-gray-700 hover:text-indigo-600">Closing Time: {product.closingTime}</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
            <h2 className="text-gray-700 hover:text-indigo-600">Location: {product.address || "Unknown"}</h2>
            </div>
            <div className="mt-2 flex justify-between items-center">
            <p className="text-gray-700 hover:text-indigo-600">Contact Us: {product.email || "Unknown"}</p>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default HomePage;
