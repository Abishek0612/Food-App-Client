import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutCustomer } from "../../redux/slice/customers/customerSlice";
import { logoutRestaurant } from "../../redux/slice/restaurant/restaurantSlice";

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

  return (
    <nav className="bg-blue-900 p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">FoodApp</div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex space-x-4">
            <li>
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

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition max-h-${
          isOpen ? "56" : "0"
        } overflow-hidden lg:hidden`}
      >
        <ul className="flex flex-col space-y-2 mt-4">
          <li>
            <Link
              className="text-white hover:text-gray-200 block px-4 py-2"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-gray-200 block px-4 py-2"
              to="/"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PrivateNavbar;
