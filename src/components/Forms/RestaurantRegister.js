import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restaurantRegisterAction } from "../../redux/slice/restaurant/restaurantSlice";
import { toast } from "react-toastify";

const RestaurantRegister = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    password: "",
    address: "",
    openingTime: "",
    closingTime: "",
  });

  const dispatch = useDispatch();
  const restaurantState = useSelector(
    (state) => state.restaurants?.restaurantAuth
  );

  useEffect(() => {
    if (restaurantState.error) {
      toast.error(restaurantState.error.message);
    }

    if (restaurantState.restaurantInfo) {
      toast.success("Restaurant registration successful!");
    }
  }, [restaurantState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.restaurantName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(restaurantRegisterAction(formData));
    setFormData({
      restaurantName: "",
      email: "",
      password: "",
      address: "",
      openingTime: "",
      closingTime: "",
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-r from-blue-500 to-slate-500">
      <div className="flex flex-col p-8 bg-white rounded-lg shadow-md w-96">
        <header className="mb-4">
          <h1 className="text-slate-500 font-serif mb-2 flex justify-center text-3xl">
            Restaurant Register
          </h1>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <span className="material-icons text-slate-400 mr-2  w-13 ">
              restaurant
            </span>
            <input
              value={formData.restaurantName}
              onChange={(e) =>
                setFormData({ ...formData, restaurantName: e.target.value })
              }
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Restaurant Name"
            />
          </div>
          <div className="flex items-center mb-4">
            <span className="material-icons text-slate-400 mr-2  w-13 ">
              email
            </span>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center mb-4">
            <span className="material-icons text-slate-400 mr-2  w-13 ">
              lock
            </span>
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center mb-4">
            <span className="material-icons text-slate-400 mr-2 w-13 ">
              location
            </span>
            <input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Address"
            />
          </div>
          <div className="flex items-center mb-4">
            <span className="material-icons text-slate-400 mr-2 w-13 ">
              schedule
            </span>
            <input
              value={formData.openingTime}
              onChange={(e) =>
                setFormData({ ...formData, openingTime: e.target.value })
              }
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Opening Time"
            />
          </div>
          <div className="flex items-center mb-4">
            <span className="material-icons text-slate-400 mr-2" w-13 mt-1>
              time
            </span>
            <input
              value={formData.closingTime}
              onChange={(e) =>
                setFormData({ ...formData, closingTime: e.target.value })
              }
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Closing Time"
            />
          </div>
          <button type="submit" className="btn">
            Restaurant Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantRegister;
