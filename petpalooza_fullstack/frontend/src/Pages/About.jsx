import React, { useEffect, useState } from "react";
import API from "../api";

export default function About() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    API.get("banners2/")
      .then((res) => setBanners(res.data))
      .catch((err) => console.error("Error fetching about banners:", err));
  }, []);

  const getBannerUrl = (image) =>
    image?.startsWith("http")
      ? image
      : `${import.meta.env.VITE_API_BASE_URL}${image}`;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative h-[300px] md:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: banners[7]?.image
            ? `url(${getBannerUrl(banners[7].image)})`
            : "url('https://placehold.co/1200x400')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base">
              Every day with every connection, Petpalooza passionate associates
              help bring pet parents closer to their pets so they can live more
              fulfilled life
            </p>
          </div>
        </div>
      </div>

      {/* Anything for Pets Section */}
      <div className="bg-green-400 py-8 px-6 text-black text-center">
        <h3 className="text-xl md:text-2xl font-bold mb-4">
          ANYTHING for PETS®
        </h3>
        <p className="max-w-4xl mx-auto text-sm md:text-base text-black leading-relaxed">
          We love pets, and we believe being pet’s makes us better people.
          That’s one of the many reasons we are Anything for Pets®. Because we
          will do anything for pets, we are putting our love for pets into
          action every day by partnering with pet parents who share the best
          lives with their pets. From rethinking how to enrich companion’s
          lives, making food & treats healthier and better balanced with
          natural, visual, meaningful packaging, to creating experiences for
          pets to try before they buy – we are innovating every day. We are here
          for pet parents because pets bring out the best in us, and our
          communities. Choose from our offering of the largest variety of pet
          products, services, and solutions across nutrition, training, grooming,
          boarding, insurance and more.
        </p>
      </div>

      {/* 3 Card Grid Section */}
      <div className="py-10 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { title: "Our story", img: banners[8]?.image },
          { title: "Media resources", img: banners[9]?.image },
          { title: "Charities", img: banners[10]?.image },
        ].map((item, i) => (
          <div
            key={i}
            className="border rounded-xl shadow-md overflow-hidden bg-white"
          >
            {item.img ? (
              <img
                src={getBannerUrl(item.img)}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
            <div className="p-4 text-center">
              <button className="w-full py-2 rounded-lg border bg-blue-600 text-white hover:bg-gray-50 hover:text-black font-medium">
                {item.title}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section with Text + Image */}
      <div className="bg-green-400 py-10 px-6 flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto rounded-xl shadow-md">
        <div className="md:w-1/2 space-y-4">
          <p className="text-sm md:text-base text-black">
            Since 1960, we’ve committed over $500 million to increased knowledge
            and benefits to help animals live healthier, longer, and better
            lives. As pet parents, we know pets make us better people, and we
            want them to always receive the best care possible. Our associates
            come to PetSmart because they love pets and want to see them
            succeed. That’s why we do #AnythingforPets® to support great lives.
          </p>
          <p className="font-semibold text-green-700">
            #LifeAtPetSmart is just a doggone great way to spend your time!
          </p>
        </div>
        <div className="md:w-1/2">
          {banners[11]?.image ? (
            <img
              src={getBannerUrl(banners[11].image)}
              alt="Happy family with pet"
              className="rounded-xl shadow-lg object-cover w-full"
            />
          ) : (
            <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-xl">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
