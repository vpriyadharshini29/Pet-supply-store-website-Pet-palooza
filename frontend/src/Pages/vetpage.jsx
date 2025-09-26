import React, { useEffect, useState } from "react";
import API from "../api";
import { Star, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VetConsult() {
  const [banners, setBanners] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    API.get("banners2/")
      .then((res) => setBanners(res.data))
      .catch((err) => console.error("Error fetching vet consult banners:", err));
  }, []);

  const getBannerUrl = (image) =>
    image?.startsWith("http")
      ? image
      : `${import.meta.env.VITE_API_BASE_URL}${image}`;

  const reviews = [
    { name: "Ajith Kumar Ak", date: "31/01/2025", rating: 5, review: "Very good. Very very good experience doctors Consultation" },
    { name: "Prem Singh", date: "12/04/2024", rating: 5, review: "Talking to the doctor was like talking to a well wisher, very good at diagnosing the issue." },
    { name: "Priya", date: "31/05/2024", rating: 5, review: "Good doctor" },
    { name: "Aby Varghese", date: "03/06/2024", rating: 5, review: "Very Friendly. Was able to find issue very quickly" },
    { name: "Prakash.", date: "24/06/2024", rating: 4, review: "The doctors are knowledgeable, compassionate, and really take the time to listen to my concerns." },
  ];

  const handleBookConsultation = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500); // auto-close after 2.5s
  };

  return (
    <div className="p-6 space-y-10 relative">
      {/* Popup Notification */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center space-x-3"
          >
            <CheckCircle className="w-6 h-6 text-white" />
            <span className="font-medium">Consultation Booked Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Dynamic Banner + Steps */}
        <div className="overflow-hidden shadow-lg rounded-2xl border">
          <div className="relative">
            {banners[2]?.image ? (
              <img
                src={getBannerUrl(banners[2].image)}
                alt="Vet consultation"
                className="object-cover w-full h-80"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No banner available</p>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-green-100 p-4 grid grid-cols-3 text-center text-sm font-medium">
              <div>Pay & Book the consultant</div>
              <div>Choose video or Teleconsultation</div>
              <div>Receive prescription after the call</div>
            </div>
          </div>
        </div>

        {/* Right: Services */}
        <div className="p-6 shadow-lg rounded-2xl border">
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <p className="text-sm text-gray-500 mb-2">
            Instant Consultation (10 AM to 7 PM)
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">
              ₹299 <span className="line-through text-gray-400">₹499</span>
            </span>
            <span className="text-green-600 font-semibold">40% OFF</span>
          </div>
          <button
            onClick={handleBookConsultation}
            className="w-full mb-3 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Book Consultation
          </button>
          {/* <button className="w-full mb-3 py-2 px-4 rounded-lg border hover:bg-gray-50">
            Check offers
          </button> */}
          {/* <p className="text-sm text-gray-600 mb-2">
            Currently, cash on delivery is not available on this product.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Free delivery on orders above ₹599
          </p>
          <button className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Add to cart
          </button> */}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-4 shadow-md rounded-xl border bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{r.name}</h3>
                <span className="text-xs text-gray-500">{r.date}</span>
              </div>
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < r.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700">{r.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
