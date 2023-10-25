import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerCustomerAction } from "../../redux/slice/customers/customerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields."); // This will show a toast immediately
      return;
    }

    try {
    await  dispatch(registerCustomerAction(formData));
    navigate('/login')
      // Success or error messages will be handled by NotificationMiddlewear
      // due to changes in the Redux store
    } catch (error) {
      // If you catch any unexpected errors here,
      // you can handle or display them if needed.
    }

    // Reset the form
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-r from-blue-500 to-slate-500">
      <div className="flex flex-col p-8 bg-white rounded-lg shadow-md w-96">
        <header className="mb-4">
          <h1 className="text-slate-500 font-serif mb-2 flex justify-center text-3xl">
            Customer Register
          </h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <input
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              className="flex-1 rounded px-3 py-2 border border-gray-300"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn">
            Customer Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegister;
