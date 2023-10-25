import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutCustomer } from "../../redux/slice/customers/customerSlice";
import { logoutRestaurant } from "../../redux/slice/restaurant/restaurantSlice";
import { selectCartItems } from "../../redux/slice/Cart/cartSlice";

function PrivateNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCustomerAuthenticated = useSelector(
    (state) => state?.customers?.isAuthenticated
  );
  const isRestaurantAuthenticated = useSelector(
    (state) => state?.restaurants?.isAuthenticated
  );
  const restaurantId = useSelector(
    (state) => state?.restaurants?.restaurantAuth?.restaurantInfo?.restaurantId
  );

  const handleLogout = () => {
    if (isCustomerAuthenticated) {
      localStorage.removeItem("customerInfo");
      dispatch(logoutCustomer());
      navigate("/");
    } else if (isRestaurantAuthenticated) {
      localStorage.removeItem("restaurantInfo");
      dispatch(logoutRestaurant());
      navigate("/");
    }
  };

  const cartItems = useSelector(selectCartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-blue-900 p-4 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white font-bold">FoodApp</div>

          {isRestaurantAuthenticated && restaurantId ? (
            <Link to={`/restaurantDashboard/${restaurantId}/home`}>
              <button className="bg-red-600 flex p-2 rounded hover:bg-red-50 transition duration-200 mx-14 mt-4">
                Dashboard
              </button>
            </Link>
          ) : null}

          {/* Display cart icon and total items for authenticated customers */}
          {isCustomerAuthenticated ? (
            <div className="text-white">
              🛒 {totalItems === 0 ? "0" : totalItems}
            </div>
          ) : null}

          <div className="lg:hidden">
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
          <ul className="list-reset">
            <li className="my-2">
              <Link className="text-white hover:text-gray-200" to="/">
                Home
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-white hover:text-gray-200"
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <Link className="text-white hover:text-gray-200" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-200"
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default PrivateNavbar;
