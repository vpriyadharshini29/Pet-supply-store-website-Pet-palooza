import { useNavigate } from "react-router-dom";
import { Mail, Phone, Package, RotateCcw, MessageCircle, CreditCard, FileText } from "lucide-react";

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      {/* Contact Us Header */}
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      {/* Sign In Box */}
      <div className="flex items-center justify-between border rounded-xl shadow-sm p-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gray-100">
            <FileText className="w-5 h-5 text-gray-700" />
          </div>
          <p className="text-sm text-gray-700">
            Getting help is easy <br />
            <span className="text-gray-500">Sign in to get help with recent orders</span>
          </p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Sign in
        </button>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between border rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Track order</p>
                <p className="text-sm text-gray-500">View the status of your order</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </div>
          <div className="flex items-center justify-between border rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Return order</p>
                <p className="text-sm text-gray-500">Return and view the items in your order</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </div>
          <div className="flex items-center justify-between border rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Chat with vet</p>
                <p className="text-sm text-gray-500">View the status of your order</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </div>
        </div>
      </div>

      {/* Browse Topics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Browse Topics</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            "Order related",
            "Return & cancellations related",
            "Payments & refund related",
            "General enquiry",
          ].map((topic, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-xl p-4 bg-white shadow-sm cursor-pointer hover:bg-gray-50"
            >
              <p className="text-sm font-medium">{topic}</p>
              <span className="text-blue-600">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Get in Touch */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Get in touch</h3>
        <p className="text-sm text-gray-700 mb-4">
          If you have any inquiries, feel free to contact us
        </p>
        <div className="space-y-2 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> Call to 1234567890
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> support@petpalooza.com
          </p>
        </div>
      </div>
    </div>
  );
}
