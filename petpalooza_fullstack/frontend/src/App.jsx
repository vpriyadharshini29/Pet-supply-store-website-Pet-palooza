import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "./api";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryPage from "./Pages/categary";
import ProductDetailPage from "./Pages/Productdetailpage";
import CartPage from "./Pages/cartpage";
import { CartProvider } from "./context/cartcontext";
import CheckoutPage from "./Pages/checkoutpage";
import HomePage from "./Pages/Homepage";
import Petservice from "./Pages/petservice";
import VetCareLanding from "./Pages/consultavet";
import VetConsult from "./Pages/vetpage";
import About from "./Pages/About";
import ContactUs from "./Pages/Contactpage";
import AuthPage from "./components/Authpage";



// Pages
// import HomePage from "./pages/HomePage";


export default function App() {
  const [images, setImages] = useState([]);
  const [footerSections, setFooterSections] = useState([]);
  const [navbarItems, setNavbarItems] = useState([]);

  useEffect(() => {
    api.get("site-images/").then((res) => setImages(res.data)).catch(() => {});
    api
      .get("footer-sections/")
      .then((res) => setFooterSections(res.data))
      .catch(() => {});
    api
      .get("navbar-items/")
      .then((res) => setNavbarItems(res.data))
      .catch(() => {});
  }, []);

  return (
   
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar always visible */}
        <Navbar items={navbarItems} images={images} />

        {/* Page Content */}
        <main  className="flex-grow" >
         
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage/>} />

              {/* Dynamic Category Page */}
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage/>} />
                <Route path="/cart" element={<CartPage/>} />
                 <Route path="/checkout" element={<CheckoutPage/>} />
                  <Route path="/petservice" element={<Petservice/>} />
                   <Route path="/vet" element={<VetCareLanding/>} />
                    <Route path="/consult" element={<VetConsult/>} />
                      <Route path="/about" element={<About/>} />
                      <Route path="/contact" element={<ContactUs/>} />
                       <Route path="/login" element={<AuthPage/>} />


            </Routes>
         
        </main>

        {/* Footer always visible */}
        <Footer sections={footerSections} images={images} />
      </div>
    </Router>
   
  );
}
