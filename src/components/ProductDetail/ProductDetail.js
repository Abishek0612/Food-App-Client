import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/slice/foodProducts/foodProductsSlice";
import {
  addToCart,
  clearCart,
  selectCartItems,
} from "../../redux/slice/Cart/cartSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.foodProducts?.singleProduct);

  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const itemInCart = cartItems.find((item) => item.productId === product?.id);
  const customerInfo = useSelector(
    (state) => state.customers?.customerAuth?.customerInfo
  );

  const handleAddToCart = () => {
    if (itemInCart && itemInCart.quantity >= product.totalQty) {
      toast.error("No Stock Left");
      return;
    }
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
        totalQty: product.totalQty,
      })
    );
  };

  if (!product) return <p>Loading...</p>;

  const handlePlaceOrder = () => {
    // Check necessary conditions like customer info and cart items
    if (!customerInfo || !customerInfo._id) {
      toast.error(
        "Customer information is missing. Please login to place an order."
      );
      return;
    }

    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Add items to the cart before placing an order."
      );
      return;
    }

    // Directly show the toastify success message
    toast.success("Order placed successfully!");

    // Clear the cart
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col md:flex-row p-8 bg-gray-100 h-screen">
      <div className="md:w-1/2 p-4">
        <img
          src="https://th.bing.com/th?id=OIP.GBAgXuKzG45Fg24WyFqTPgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          alt={product.itemName}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-1/2 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.itemName}</h1>
          <p className="text-xl text-gray-700 mb-4">Price: ${product.price}</p>
          <p className="text-md text-gray-500 mb-4">{product.description}</p>
          <p className="text-sm text-gray-400">Available: {product.totalQty}</p>

          {itemInCart && itemInCart.quantity >= product.totalQty ? (
            <p className="text-red-600">No stock left</p>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 self-start"
            >
              Add to Cart
            </button>
          )}

          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mt-4 self-start"
          >
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
