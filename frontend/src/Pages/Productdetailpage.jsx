import { useLocation, useParams, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/cartcontext";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export default function ProductDetailPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // New state
  const { addToCart } = useCart();

  if (!state?.product) return <Navigate to={`/category/${id}`} replace />;

  const product = state.product;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize); // Ensure added to cart
    navigate("/checkout", { state: { products: [{ ...product, quantity, size: selectedSize }] } });
  };
    const [rating, setRating] = useState(0);

  return (
    <section>
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-2 gap-8 relative">
      {/* LEFT: Product Image */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-contain border rounded"
        />
      </div>

      {/* RIGHT: Product Details */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-gray-700">{product.short_description}</p>

        <p className="text-red-600 font-bold text-lg">
          MRP: ₹{product.price}{" "}
          <span className="text-sm text-gray-500">Inclusive of all taxes</span>
        </p>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="flex gap-3">
            <span className="font-semibold">Available Size:</span>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <span className="font-semibold">Quantity:</span>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* SECOND HALF: Product Description + Image */}
      <div className="col-span-2 mt-12 grid grid-cols-2 gap-8 items-start">
        {/* LEFT: Hardcoded Description */}
        <div>
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Fresh Dog Food</strong>
              <br />
              Small Breed Dog Food, Turkey, Chickpea & Sweet Potato – Quality
              Canadian sources of protein, including fresh turkey, form the
              foundation of our recipe.
            </p>
            <p>
              <strong>Flaxseed, chia seed, salmon oil for healthy skin & coat</strong>
              <br />
              This powerful combination ensures a diet rich in omega fatty acids
              to help maintain a shiny coat.
            </p>
            <p>
              <strong>Prebiotics & probiotics for a healthy digestive system</strong>
              <br />
              Ingredients rich in dietary fiber such as beans, oats, and barley
              support digestion.
            </p>
            <p>
              <strong>Rich in antioxidants to support a healthy immune system</strong>
              <br />
              Berries and carrots loaded with phytonutrients and minerals boost
              immunity.
            </p>
          </div>
        </div>

        {/* RIGHT: Static Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain border rounded"
          />
        </div>
      </div>

      {/* Animated Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed top-20 right-10 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            ✅ Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <div className="p-6 border rounded-2xl shadow-sm bg-white max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left - Rating Summary */}
        <div>
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-gray-400"
                fill="none"
              />
            ))}
            <span className="text-sm text-gray-600">0 reviews</span>
          </div>

          {/* Rating Breakdown */}
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2 mb-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Right - Review Form */}
        <div>
          {/* <h3 className="text-md font-semibold mb-2">
            Be the first to review <span className="italic">“Turkey, Chickpea & Sweet Potato | Small Breed 2Kg”</span>
          </h3> */}
          <p className="text-sm text-gray-600 mb-4">
            Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
          </p>

          {/* Rating Stars */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${
                    i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
          </div>

          {/* Review Input */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Save Info */}
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" id="saveInfo" className="w-4 h-4" />
            <label htmlFor="saveInfo" className="text-sm text-gray-600">
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>

          {/* Submit */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
            Submit
          </button>
        </div>
      </div>
    </div>
    </section>
  );
}
