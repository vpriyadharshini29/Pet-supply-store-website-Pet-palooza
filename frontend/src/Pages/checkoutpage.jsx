import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api";

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const products = state?.products || [];

  const [discount, setDiscount] = useState("");
  const [applied, setApplied] = useState(false);

  // form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("online");
  const [loading, setLoading] = useState(false);

  // popup state
  const [popup, setPopup] = useState({
    show: false,
    success: false,
    message: "",
  });

  if (products.length === 0)
    return <div className="p-6">No products selected!</div>;

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 99 : 0;
  const total = applied ? subtotal + shipping - 100 : subtotal + shipping;

  // ---------------- Order Submit Handler ----------------
  const handleOrder = async () => {
    setLoading(true);
    try {
      const payload = {
        customer: {
          email,
          first_name: firstName,
          last_name: lastName,
          address,
          city,
          state: stateName,
          pincode,
          phone,
        },
        subtotal,
        shipping,
        discount: applied ? 100 : 0,
        total,
        payment_method: payment,
        items: products.map((p) => ({
          product_id: p.id,
          name: p.name,
          size: p.size || null,
          price: p.price,
          quantity: p.quantity,
        })),
      };

      console.log("Sending payload:", payload);

      const res = await API.post("/orders/", payload);

      // success popup
      setPopup({
        show: true,
        success: true,
        message: "✅ Order placed successfully!",
      });
      setTimeout(() => {
        setPopup({ show: false, success: false, message: "" });
        navigate("/"); // redirect home
      }, 2000);
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      let errorMsg = "❌ Failed to place order";
      if (err.response?.status === 401) {
        errorMsg = "⚠️ Please login to place an order";
      } else if (err.response?.data) {
        errorMsg = JSON.stringify(err.response.data);
      }
      setPopup({ show: true, success: false, message: errorMsg });
      setTimeout(
        () => setPopup({ show: false, success: false, message: "" }),
        2500
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* ---------------- Animated Popup ---------------- */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 ${
              popup.success ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Checkout Grid ---------------- */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side (Form) */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>

          {/* Contact */}
          <div>
            <h2 className="font-semibold mb-2">Contact</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (for order updates)"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Delivery */}
          <div>
            <h2 className="font-semibold mb-2">Delivery</h2>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-1/2 border p-2 rounded"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full border p-2 rounded mb-2"
            />
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-1/3 border p-2 rounded"
              />
              <input
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder="State"
                className="w-1/3 border p-2 rounded"
              />
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                className="w-1/3 border p-2 rounded"
              />
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full border p-2 rounded mb-2"
            />
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-semibold mb-2">Choose your payment method</h2>
            <label className="flex items-center gap-2 border p-2 rounded mb-2">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={payment === "online"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>Secure transaction (UPI, Cards, Wallets, Net banking)</span>
            </label>
            <label className="flex items-center gap-2 border p-2 rounded">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Order Now"}
          </button>
        </div>

        {/* Right Side (Order Summary) */}
        <div className="bg-green-100 p-4 rounded space-y-4">
          <h2 className="font-bold text-lg">Order summary</h2>

          {products.map((item, idx) => (
            <div key={idx} className="flex gap-4 border p-2 rounded bg-white">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                )}
                <p>Quantity: {item.quantity}</p>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          {/* Discount */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Discount code or gift card"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <button
              onClick={() => setApplied(true)}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>

          {/* Price Details */}
          <div className="space-y-1">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Shipping: ₹{shipping}</p>
            {applied && <p className="text-green-600">Discount: -₹100</p>}
            <p className="font-bold text-lg">Total: ₹{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
