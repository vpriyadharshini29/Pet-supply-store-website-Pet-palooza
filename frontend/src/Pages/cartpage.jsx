import { useCart } from "../context/cartcontext";
import { useNavigate } from "react-router-dom";
import { Phone, Lock, EyeOff } from "lucide-react";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const handleBuyNow = () => {
    navigate("/checkout", { state: { products: cartItems } });
  };

  return (
    <section>
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-3 gap-6">
      {/* LEFT: Cart items */}
      <div className="col-span-2">
        <h1 className="text-xl font-bold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Remove</th>
                <th className="p-2">Product</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={`${item.id}-${item.size || "default"}`} className="border-t">
                  <td className="p-2">
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-600 font-bold"
                    >
                      X
                    </button>
                  </td>
                  <td className="p-2 flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                    <span>{item.name}</span>
                    {item.size && <span className="text-xs text-gray-500">({item.size})</span>}
                  </td>
                  <td className="p-2">₹{item.price}</td>
                  <td className="p-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                      className="px-2 border rounded"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-2">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* RIGHT: Hardcoded Checkout Section */}
      <div className="col-span-1 border p-4 rounded shadow space-y-2">
        <h2 className="font-bold mb-4">Card Totals</h2>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping: ₹{shipping}</p>
        <p className="font-bold">Total: ₹{total}</p>
        <button onClick={handleBuyNow} className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          Buy Now
        </button>

        {/* ✅ Hardcoded static content */}
        <div className="text-xs text-gray-500 mt-6">
          <p>Free products dog food combo 5kg, turkey</p>
          <p>Free products dog food 2kg turkey</p>
          <p>Free products dog food 2kg chicken</p>
        </div>
      </div>
    </div>
     <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Green Offers */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-300 p-6 rounded-lg text-center font-semibold">
          Free products <br /> dog food combo 5 kg, turkey
        </div>
        <div className="bg-green-300 p-6 rounded-lg text-center font-semibold">
          Free products <br /> dog food 2 kg turkey
        </div>
        <div className="bg-green-300 p-6 rounded-lg text-center font-semibold">
          Free products <br /> dog food 2 kg chicken
        </div>
      </div>

      {/* Info Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left - Help & Security */}
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Call Us */}
          <div className="flex flex-col items-center text-center">
            <Phone className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold">Have a question?</p>
            <p className="text-sm">
              Our experts are here to call:{" "}
              <a href="tel:1234567890" className="text-blue-600 underline">
                call us
              </a>
            </p>
          </div>

          {/* Secure Shopping */}
          <div className="flex flex-col items-center text-center">
            <Lock className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold">Secure shopping</p>
            <p className="text-sm">All transactions are protected by SSL</p>
          </div>

          {/* Privacy Protection */}
          <div className="flex flex-col items-center text-center">
            <EyeOff className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold">Privacy protection</p>
            <p className="text-sm">Your privacy is always our top priority.</p>
          </div>
        </div>

        {/* Right - Payment & Policies */}
        <div>
          <h3 className="font-bold mb-2">Payment methods</h3>
         <div className="flex items-center gap-3 mb-4 flex-wrap">
  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg shadow-sm border">
    GPay
  </span>
  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg shadow-sm border">
    PhonePe
  </span>
  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg shadow-sm border">
    Mastercard
  </span>
  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg shadow-sm border">
    PayPal
  </span>
  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg shadow-sm border">
    Visa
  </span>
</div>


          {/* Delivery Info */}
          <p className="text-sm mb-3">
            <span className="font-bold">Delivery information:</span> Although we don’t think you’ll ever want one, we’ll gladly
            provide a refund if it’s requested within 14 days of purchase.
          </p>

          {/* Refund Policy */}
          <p className="text-sm">
            <span className="font-bold">14 Days Money Back Guarantee:</span> Although we don’t think you’ll ever want one, we’ll gladly
            provide a refund if it’s requested within 14 days of purchase.
          </p>
        </div>
      </div>
    </div>
    </section>
  );
}
