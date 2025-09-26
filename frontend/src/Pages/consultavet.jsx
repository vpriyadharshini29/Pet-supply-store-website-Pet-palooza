import React, { useEffect, useState } from "react";
import API from "../api";
import { Stethoscope, PawPrint, Bone, Ear, Eye, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VetCareLanding() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("banners2/")
      .then((res) => setBanners(res.data))
      .catch((err) => console.error("Error fetching vet banners:", err));
  }, []);

  const getBannerUrl = (image) =>
    image?.startsWith("http")
      ? image
      : `${import.meta.env.VITE_API_BASE_URL}${image}`;

  return (
    <div className="w-full font-sans">
      {/* ================= Hero Banner ================= */}
      {banners[2]?.image ? (
        <div className="relative w-full h-[300px]">
          <img
            src={getBannerUrl(banners[2].image)}
            alt="Vet Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center p-6 text-white">
            <h2 className="text-lg max-w-md">
              Instant and complete vet care whenever you are. At only ₹299 - get
              end-to-end support from our vets
            </h2>
            <button
              onClick={() => navigate("/consult")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
            >
              Consult Now
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No banner available</p>
        </div>
      )}

      {/* ================= Features Bar ================= */}
      <div className="bg-blue-600 text-white flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-3 text-sm font-medium">
        <p>✅ Verified Doctors</p>
        <p>💬 Free follow-up</p>
        <p>💊 Medicine delivery</p>
      </div>

      {/* ================= Service Categories ================= */}
      <div className="flex flex-wrap gap-6 px-4 py-8 justify-center">
        {[
          { icon: <Stethoscope className="w-7 h-7 text-blue-600" />, label: "General Checkup" },
          { icon: <PawPrint className="w-7 h-7 text-blue-600" />, label: "Skin Issues" },
          { icon: <Bone className="w-7 h-7 text-blue-600" />, label: "Digestive Issues" },
          { icon: <Bone className="w-7 h-7 text-blue-600" />, label: "Paws & Limbs" },
          { icon: <Ear className="w-7 h-7 text-blue-600" />, label: "Ear Issues" },
          { icon: <Eye className="w-7 h-7 text-blue-600" />, label: "Eye Issues" },
          { icon: <Utensils className="w-7 h-7 text-blue-600" />, label: "Nutrition" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center w-24">
            <div className="p-4 border-2 border-gray-200 rounded-full bg-white shadow-md">
              {item.icon}
            </div>
            <p className="text-sm text-center mt-3 font-medium text-gray-700">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* ================= Middle Info Banner ================= */}
      {banners[3]?.image && (
        <div className="px-4">
          <div className="bg-green-50 rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
            <img
              src={getBannerUrl(banners[3].image)}
              alt="Dog Banner"
              className="w-full md:w-1/2 h-56 object-cover"
            />
            <div className="p-6 text-center md:text-left">
              <p className="text-lg font-medium">
                Get Stress-Free Pet Care from the comfort of your home
              </p>
              <button
                onClick={() => navigate("/consult")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium text-white"
              >
                Consult Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Experts Section (Dynamic Banners) ================= */}
      {banners.length > 2 && (
        <div className="px-4 py-12">
          <h2 className="text-xl font-bold text-center mb-10">
            Access our expert vets from anywhere
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {banners.slice(4).map((doc, idx) => (
              <div
                key={idx}
                className="rounded-2xl shadow-md border p-8 flex flex-col items-center text-center bg-white"
              >
                <img
                  src={getBannerUrl(doc.image)}
                  alt={doc.title || "Doctor"}
                  className="w-24 h-24 rounded-full mb-6 object-cover"
                />
                <h3 className="font-semibold text-lg text-gray-800">
                  {doc.title || "Doctor Name"}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {doc.subtitle || "Specialization & Experience"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {doc.description || "Qualification"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
