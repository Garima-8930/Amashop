import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // 👈 अपने context का सही path डालना

const ProductCard = ({ product }) => {
  const { cart, dispatch } = useCart();
  const [added, setAdded] = useState(false);

  // check अगर product पहले से cart में है
  useEffect(() => {
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      setAdded(true);
    }
  }, [cart, product._id]);

  const handleAddToCart = () => {
    if (!added) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      setAdded(true);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-contain mb-3"
      />
      <h2 className="text-lg font-semibold text-center">{product.name}</h2>
      <p className="text-gray-600 text-sm text-center mb-2">{product.description}</p>
      <p className="text-blue-600 font-bold mb-3">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className={`px-4 py-2 rounded-lg w-full font-medium transition duration-300 ${
          added
            ? "bg-green-500 text-white cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={added}
      >
        {added ? "Added ✅" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
