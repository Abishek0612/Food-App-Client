import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicNavbar from './components/Navbar/PublicNavbar';
import Login from './components/Forms/Login';
import HomePage from './components/HomePage/HomePage';
import RestaurantRegister from './components/Forms/RestaurantRegister';
import CustomerRegister from './components/Forms/CustomerRegister';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Restaurant/Dashboard/Dashboard';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import { useSelector } from 'react-redux';


function App() {

  const isCustomerAuthenticated = useSelector((state)=> state?.customers?.isAuthenticated)
  const isRestaurantAuthenticated = useSelector((state)=> state?.restaurants?.isAuthenticated)



  console.log("isCustomerAuthenticated:", isCustomerAuthenticated);
console.log("isRestaurantAuthenticated:", isRestaurantAuthenticated);


  return (
 <>
  <ToastContainer />

  <BrowserRouter>
   {/* //! Conditionally render the navbars based on the authentication status  */}
{isCustomerAuthenticated || isRestaurantAuthenticated  ? <PrivateNavbar/ > : <PublicNavbar />}

    <Routes>
      <Route  path='/' element={<HomePage />}/>
      <Route  path="/restaurantDashboard/:restaurantId" element={<Dashboard />}/>
      <Route  path='/login' element={<Login />}/>
      <Route  path='/restaurant-register' element={<RestaurantRegister />}/>
      <Route  path='/customer-register' element={<CustomerRegister />}/>
    </Routes>
  </BrowserRouter>

 </>
  );
}

export default App;
