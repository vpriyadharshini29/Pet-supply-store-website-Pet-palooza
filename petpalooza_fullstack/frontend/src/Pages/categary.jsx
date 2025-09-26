import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/cartcontext";

export default function CategoryPage() {
  const { id } = useParams(); // category id from URL
  const [category, setCategory] = useState(null);
  const { addToCart } = useCart();

  // State for animated popup
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api
      .get(`category/${id}/`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.error("Error fetching category:", err));
  }, [id]);

  // Function to handle Add to Cart + show popup
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setPopup(product.name);

    // Hide popup after 2 seconds
    setTimeout(() => setPopup(null), 2000);
  };

  if (!category) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      {/* Animated Popup */}
      {popup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-fade z-50">
          <span className="font-semibold">{popup}</span> added to cart!
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>

      {/* Subcategories */}
      {category.subcategories?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Subcategories</h2>
          <div className="flex flex-wrap gap-4">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/category/${sub.id}`}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Layout: Sidebar + Products */}
      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar with Banners */}
        <aside className="col-span-1 space-y-4">
          {category.banners?.map((banner) => (
            <div key={banner.id} className="bg-white shadow rounded overflow-hidden">
              <img src={banner.image} alt={banner.title} />
              <div className="p-2">
                <p className="font-semibold">{banner.title}</p>
              </div>
            </div>
          ))}
        </aside>

        {/* Product Grid */}
        <main className="col-span-3 grid grid-cols-3 gap-6">
          {category.products?.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-contain"
              />
              <h2 className="font-semibold mt-2">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.weight}</p>
              <div className="flex items-center text-yellow-500 text-sm mt-1">
                {"★".repeat(Math.round(product.rating))}
                <span className="ml-2 text-gray-600 text-xs">
                  ({product.reviews} reviews)
                </span>
              </div>
              <p className="font-bold mt-2">₹{product.price}</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>

              {/* View Details Link */}
              <Link
                to={`/product/${product.id}`}
                state={{ product }}
                className="text-blue-500 mt-2 underline text-sm text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </main>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes slide-fade {
            0% { transform: translateX(100%); opacity: 0; }
            20% { transform: translateX(0); opacity: 1; }
            80% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          .animate-slide-fade {
            animation: slide-fade 2s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
}
  