import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutCustomer } from "../../redux/slice/customers/customerSlice";
import { logoutRestaurant } from "../../redux/slice/restaurant/restaurantSlice";

function PrivateNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null); // reference to the nav element
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
    }
  };

  // Close the navbar if clicked outside
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add and remove the event listener based on the navbar's open state
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-blue-900 p-4" ref={navRef}>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white font-bold">FoodApp</div>
          <div className="lg:hidden">
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full block flex-grow flex-end  lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 text-white md:bg-transparent z-20`}
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <Link
                  className="inline-block py-2 px-4 text-white no-underline"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="mr-3">
                <Link
                  onClick={handleLogout}
                  className="inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  to="/"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PrivateNavbar;
