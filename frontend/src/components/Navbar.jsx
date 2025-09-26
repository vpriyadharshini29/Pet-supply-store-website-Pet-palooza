import React from "react";
import SecondNavbar from "./secondnavbar";


function NavItem({ item }) {
  return (
    <div className="relative group">
      <a href={item.url || "#"} className="px-3 py-2 inline-block">
        {item.title}
      </a>
      {item.children && item.children.length > 0 && (
        <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black rounded shadow-lg">
          {item.children.map((c) => (
            <a
              key={c.id}
              href={c.url || "#"}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {c.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ items, images }) {
  const logo = images.find(
    (i) => i.name && i.name.toLowerCase().includes("navbar")
  );
  return (
    <header className="bg-[#1f4bd6] text-white">
      {/* First Navbar */}
      <div className="max-w-6xl mx-auto flex items-center gap-6 p-4">
        <div className="w-36">
  <img
    src="/images/logo.png"   // 👈 replace with your actual image path
    alt="logo"
    className="w-full"
  />
</div>

        <div className="text-xl font-bold">PetPalooza</div>
        <div className="flex-1">
          <input
            placeholder="Search for products"
            className="w-full rounded-full p-3 text-black"
          />
        </div>
        <nav className="flex items-center gap-4">
          {items.map((it) => (
            <NavItem key={it.id} item={it} />
          ))}
        </nav>
      </div>

      {/* Second Navbar (from backend) */}
      <SecondNavbar />
    </header>
  );
}
