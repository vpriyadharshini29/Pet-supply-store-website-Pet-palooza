import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function SecondNavbar() {
  const [navItems, setNavItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("navbar/").then((res) => {
      setNavItems(res.data);
    });
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-2 flex space-x-6 relative z-50">
      {navItems.map((item) => (
        <div key={item.id} className="relative">
          {/* Top-level item */}
          {item.has_dropdown ? (
            <button
              onClick={() => toggleDropdown(item.id)}
              className="font-semibold flex items-center gap-1 cursor-pointer"
              type="button"
            >
              {item.name} <span>▼</span>
            </button>
          ) : (
            <Link
              to={item.link || `/category/${item.id}`}
              className="font-semibold hover:text-gray-200"
            >
              {item.name}
            </Link>
          )}

          {/* Dropdown (click-based) */}
          {item.has_dropdown &&
            openDropdown === item.id &&
            item.subcategories?.length > 0 && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                {item.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    to={sub.link || `/category/${sub.id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpenDropdown(null)} // close dropdown after click
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
        </div>
      ))}
    </nav>
  );
}
