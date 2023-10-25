import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null); // reference to the nav element
  const menuButtonRef = useRef(null);

  // Close the navbar if clicked outside
  const handleClickOutside = (event) => {
    if (
      navRef.current &&
      !navRef.current.contains(event.target) &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  // Add and remove the event listener based on the navbar's open state
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-900 p-4" ref={navRef}>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white font-bold">FoodApp</div>
          <div className="lg:hidden">
            <button
              className="text-white"
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
            >
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
                  className="inline-block py-2 px-4 text-white no-underline"
                  to="/restaurant-register"
                >
                  Restaurant Register
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  className="inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  to="/customer-register"
                >
                  Customer Register
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  className="inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
