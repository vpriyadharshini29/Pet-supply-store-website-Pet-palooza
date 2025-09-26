import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Scissors,
  Home,
  Dog,
  GraduationCap,
  Stethoscope,
  Heart,
} from "lucide-react";

export default function Petservice() {
  const [banners, setBanners] = useState([]);

  // Fetch banners from Django backend
  useEffect(() => {
    API.get("banners2/")
      .then((res) => {
        console.log("Banners API response:", res.data);
        setBanners(res.data);
      })
      .catch((err) => console.error("Error fetching banners:", err));
  }, []);

  // Function to safely get banner URL
  const getBannerUrl = (image) => {
    if (!image) return "";
    return image.startsWith("http")
      ? image
      : `${import.meta.env.VITE_API_BASE_URL}${image}`;
  };

  return (
    <div className="p-0 m-0">
      {/* ================= Header with Full-width Banner ================= */}
      {banners.length > 0 && banners[0].image ? (
        <div
          className="w-full h-64 bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${getBannerUrl(banners[0].image)})` }}
        >
          {/* Circle logo over banner */}
          {/* <div className="w-45 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <h1 className="text-white font-bold text-lg">PetPalooza</h1>
          </div> */}
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No banner available</p>
        </div>
      )}

      <div className="p-6">
        {/* ================= Services Section ================= */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center mb-10 mt-6">
          {[
            { name: "Grooming", icon: <Scissors size={28} /> },
            { name: "PetsHotel", icon: <Home size={28} /> },
            { name: "Doggie Day Camp", icon: <Dog size={28} /> },
            { name: "Training", icon: <GraduationCap size={28} /> },
            { name: "Veterinary Care", icon: <Stethoscope size={28} /> },
            { name: "Adoption", icon: <Heart size={28} /> },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-green-400 rounded-lg p-6 shadow flex flex-col items-center justify-center hover:scale-105 transition"
            >
              <div className="mb-2 text-black">{service.icon}</div>
              <p className="font-semibold text-black">{service.name}</p>
            </div>
          ))}
        </div>

        {/* ================= Pet Services Text ================= */}
        <div className="text-left mb-6 max-w-5xl mx-auto text-gray-700">
          <h2 className="font-bold text-lg mb-2">Pet Services</h2>
          <p>
            Whether it’s grooming day, playdate, sleepover, training class or a
            veterinary visit, we provide the best in pet care services with highly
            trained professionals. From our pet hotel to doggie day camp, your pet
            will enjoy socialization, exercise, and top-notch care. Our training
            and grooming team is also available to fit your pet’s needs. Learn
            more about our PetSmart stores.
          </p>
          <p className="mt-2 text-blue-600 font-semibold">
            customer service <br /> +91-1234567890
          </p>
        </div>

        {/* ================= Banners Section ================= */}
       <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
  {/* Summer Special Banner */}
  <div className="bg-blue-600 text-white p-6 rounded-2xl flex flex-col justify-between">
    <div>
      <h2 className="font-bold text-xl">Summer Special</h2>
      <p className="mt-2">
        Upgrade a single suite with an overnight stay. With a coupon savings +
        more, $350+ in coupon savings & meals.
      </p>
    </div>
    <button className="bg-white text-blue-600 px-4 py-2 mt-4 rounded-lg font-semibold">
      Book Now
    </button>
  </div>

  {/* Promotional Banner */}
  <div>
    {banners.length > 0 && banners[1].image && (
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src={getBannerUrl(banners[1].image)}
          alt="Promotional Banner"
          className="w-full h-full object-cover"
        />
      </div>
    )}
  </div>

  {/* Monthly Specials Banner */}
  <div className="bg-green-600 text-white p-6 rounded-2xl flex flex-col justify-between">
    <div>
      <h2 className="font-bold text-xl">Monthly Specials</h2>
      <p className="mt-2">
        Check out deals, offers & savings in grooming, boarding, day camp.
      </p>
    </div>
    <button className="bg-white text-green-600 px-4 py-2 mt-4 rounded-lg font-semibold">
      Get Details
    </button>
  </div>
</div>

        

        {/* ================= Lower Offers Section ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Yappy Hour */}
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow">
            <h2 className="font-bold text-blue-600">Yappy Hour</h2>
            <p className="mt-2 text-gray-700">
              $5 OFF per session walk-in or reservations Monday Thru Friday
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg font-semibold">
              Learn more
            </button>
          </div>

          {/* Training Offer */}
          <div className="bg-yellow-500 text-white p-6 rounded-lg text-center">
            <h2 className="font-bold">ONLY $129 any 6-wk. Training Class</h2>
            <p className="mt-2">(that’s $21.50 a class) valid thru 7/6</p>
            <button className="bg-white text-yellow-500 px-4 py-2 mt-4 rounded-lg font-semibold">
              Enroll Now
            </button>
          </div>

          {/* Travel Offer */}
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow">
            <h2 className="font-bold text-blue-600">
              Traveling without your pet?
            </h2>
            <p className="mt-2 text-gray-700">
              Suite upgrades and fun add-ons make their stay even more special!
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg font-semibold">
              Book Stay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
