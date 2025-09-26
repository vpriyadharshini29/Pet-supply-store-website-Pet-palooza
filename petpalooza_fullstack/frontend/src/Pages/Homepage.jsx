import { useEffect, useState } from "react";
import API from "../api"; // adjust path if needed
import { getBanners, getPromos } from "../api";

export default function HomePage() {
  const [banners, setBanners] = useState([]);
  const [pets, setPets] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  // For promos (from second code)
  const [promoBanners, setPromoBanners] = useState([]);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    API.get("/banners/").then((res) => setBanners(res.data));
    API.get("/pets/").then((res) => setPets(res.data));
    API.get("/products/").then((res) => setProducts(res.data));

    // Extra promo/banners sections
    getBanners().then((res) => setPromoBanners(res.data));
    getPromos().then((res) => setPromos(res.data));
  }, []);

  // Auto-slide banners every 3s
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="w-full">
      {/* 1. Banner Section (Auto-sliding) */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {banners.length > 0 && (
          <img
            src={banners[currentBanner].image}
            alt={banners[currentBanner].alt_text}
            className="w-full h-full object-cover transition-all duration-500"
          />
        )}
      </div>

      {/* 2. Shop by Pet Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Shop by Pet</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="flex flex-col items-center transform transition hover:scale-105"
          >
            <div className="w-36 h-36 bg-[#90EE90] rounded-full flex items-center justify-center shadow-md">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <p className="mt-2 font-medium">{pet.name}</p>
          </div>
        ))}
      </div>

      {/* 3. Top Rated Calming Products */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
        Top Rated Calming Products
      </h2>
      <div className="flex justify-center flex-wrap gap-6">
        {products.map((p, idx) => (
          <div
            key={p.id}
            className="w-40 border rounded-lg p-3 shadow hover:shadow-lg transition"
          >
            <img
              src={p.image}
              alt={p.alt_text}
              className="w-full h-32 object-cover rounded"
            />
            {/* Hardcoded text except image */}
            <h3 className="text-sm font-semibold mt-2">
              Sample Product {idx + 1}
            </h3>
            <p className="text-yellow-500">⭐⭐⭐⭐☆</p>
            <p className="text-gray-800 font-bold">₹ 299</p>
          </div>
        ))}
      </div>
    {/* 4. Extra Banner Section (from other code) */}
     <div className="w-full p-6 space-y-8 mt-12">
  {promoBanners.map((banner) => (
    <div
      key={banner.id}
      className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={banner.image}
        alt={banner.title}
        className="w-full h-full "
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          {banner.title}
        </h2>
      </div>
    </div>
  ))}


        {/* 5. Promo Section */}
        <div>
          {/* <h2 className="text-xl font-bold mb-4">Special Promos</h2> */}
          
        </div>

        {/* 6. Services Section (Hardcoded) */}
        <div>
          <h2 className="text-xl font-bold mb-4">Pet Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="rounded-xl border shadow p-4 text-center hover:shadow-lg transition"
              >
                <img
                  src={promo.image}
                  alt={promo.name}
                  className="h-32 w-full object-contain mb-2"
                />
                <p className="font-semibold">{promo.name}</p>
              
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-white shadow rounded-xl">
              <p className="font-bold">Grooming</p>
              <p className="text-sm">Summer Salon Special</p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <p className="font-bold">Training</p>
              <p className="text-sm">Any 6-wk Training Class</p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <p className="font-bold">Petshotel</p>
              <p className="text-sm">Stay 4 nights get 5th free</p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <p className="font-bold">Doggy Day Camp</p>
              <p className="text-sm">Save 50% on 1st day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
