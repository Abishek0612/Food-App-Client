import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRestaurantAction } from "../../redux/slice/restaurant/restaurantSlice";
import { toast } from "react-toastify";
import { loginCustomerAction } from "../../redux/slice/customers/customerSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerAuth = useSelector((state) => state?.customers?.customerAuth);
  const restaurantAuth = useSelector(
    (state) => state?.restaurants?.restaurantAuth
  );

  const authState = userType === "customer" ? "cutomers" : "restaurants";
  const { loading, error, success } = useSelector(
    (state) => state[authState]?.customerAuth || {}
  );

  useEffect(() => {
    if (customerAuth.customerInfo) {
      toast.success("Customer Login Successful");
      navigate("/");
    } else if (restaurantAuth.restaurantInfo) {
      toast.success("Restaurant Login Successful");
      navigate(`/restaurantDashboard/${restaurantAuth.restaurantInfo.restaurantId}`);
    
    } else if (error) {
      toast.error(error);
    }
  }, [customerAuth, restaurantAuth, navigate, error]);
  

  const handleLogin = (e) => {
    e.preventDefault();

    if (userType === "restaurant") {
      dispatch(loginRestaurantAction({ email, password }));
    } else {
      dispatch(loginCustomerAction({ email, password }));
    }
    success ? toast.success("Login SUccessfull") : error && toast.error(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-slate-500">
      <div className="flex flex-col p-8 bg-white rounded-lg shadow-md w-96">
        <header className="mb-4">
          <h1 className="text-slate-500 font-serif mb-2 flex justify-center text-3xl">
            {userType === "customer" ? "Customer Login" : "Restaurant Login"}
          </h1>
        </header>

        <div className="flex items-center mb-4">
          <span className="material-icons text-slate-400 mr-2">email</span>
          <input
            className="flex-1 rounded px-3 py-2 border border-gray-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <span className="material-icons text-slate-400 mr-2">lock</span>
          <input
            className="flex-1 rounded px-3 py-2 border border-gray-300"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <button onClick={handleLogin} className="btn mb-4">
            Login
          </button>
        )}
        <button
          className="btn"
          onClick={() =>
            setUserType((prev) =>
              prev === "customer" ? "restaurant" : "customer"
            )
          }
        >
          Switch to {userType === "customer" ? "Restaurant" : "Customer"} Login
        </button>
      </div>
    </div>
  );
};

export default Login;
