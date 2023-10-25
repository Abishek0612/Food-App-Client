import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodProducts } from "../../redux/slice/foodProducts/foodProductsSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, error, foodProducts } = useSelector(
    (state) => state.foodProducts
  );

  const customerInfo = useSelector(
    (state) => state.customers.customerAuth.customerInfo
  );

  useEffect(() => {
    dispatch(fetchFoodProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Food Products</h1>

      {customerInfo && (
        <div className="mb-6 p-4 bg-indigo-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <p className="text-2xl font-semibold text-indigo-600 mb-2">
            Welcome, {customerInfo.name}
          </p>
          <p className="text-lg text-indigo-500 italic">
            Email: {customerInfo.email}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(foodProducts) &&
          foodProducts.map((product) => {
            console.log("Product ID in HomePage:", product._id);
            return (
              <Link to={`/food-product/${product._id}`} key={product._id}>
                <div
                  key={product._id}
                  className="border p-4 rounded-lg shadow hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:bg-indigo-50"
                >
                  <h2 className="text-gray-700 hover:text-indigo-600 font-extrabold">
                    Restaurant Name :
                    {product.restaurantName || "Unknown Restaurant"}
                  </h2>
                  <img
                    src="https://th.bing.com/th?id=OIP.GBAgXuKzG45Fg24WyFqTPgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                    alt={product.itemName}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-indigo-600">
                    Food Title : {product.itemName}
                  </h2>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-gray-600 mb-2">
                      Food Description: {product.description}
                    </p>
                    <span className="text-lg font-bold text-indigo-600">
                      Rs {product.price}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center font-extrabold">
                    <p className="text-gray-600 mb-2">
                      TOtal Quantity: {product.totalQty}
                    </p>
                    <p className="text-gray-600 mb-2">
                      TOtal Sold: {product.totalSold}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <h2 className="text-gray-700 hover:text-indigo-600">
                      Opening Time: {product.openingTime || "Unknown"}
                    </h2>
                    <span className="text-gray-700 hover:text-indigo-600">
                      Closing Time: {product.closingTime}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <h2 className="text-gray-700 hover:text-indigo-600">
                      Location: {product.address || "Unknown"}
                    </h2>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-gray-700 hover:text-indigo-600">
                      Contact Us: {product.email || "Unknown"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
