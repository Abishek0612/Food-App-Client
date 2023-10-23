import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/slice/foodProducts/foodProductsSlice";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.foodProducts?.singleProduct);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  
  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row p-8 bg-gray-100 h-screen">
      <div className="md:w-1/2 p-4">
        <img
          src="https://via.placeholder.com/400"
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
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 self-start">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
