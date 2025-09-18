// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = () => {
    // mock login for now
    navigate("/dashboard");
  };

  // floating droplets data (spread randomly)
  const droplets = [
    { size: 10, x: "10%", y: "20%", delay: 0 },
    { size: 14, x: "30%", y: "70%", delay: 2 },
    { size: 12, x: "70%", y: "30%", delay: 4 },
    { size: 16, x: "85%", y: "60%", delay: 1 },
    { size: 18, x: "50%", y: "80%", delay: 3 },
    { size: 20, x: "20%", y: "50%", delay: 5 },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-teal-500 via-blue-500 to-teal-600">
      {/* floating droplets in background */}
      {droplets.map((drop, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25, y: [0, -20, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: drop.delay }}
          className="absolute"
          style={{ top: drop.y, left: drop.x }}
        >
          <Droplets className={`w-${drop.size} h-${drop.size} text-white`} />
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">
           SWAGATAM 🙏🏼
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Dive into India’s groundwater insights with Hydro AI Talk.  
            Sign in to explore, analyze, and forecast data effortlessly.
          </p>
        </div>

        {/* Auth card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            {isSignUp ? "Create Account" : "Let's Get you Logged in"}
          </h1>

          {/* Form */}
          <div className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400 outline-none"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          {/* Primary button */}
          <button
            onClick={handleAuth}
            className="w-full mt-6 py-3 rounded-xl bg-teal-500 text-white font-semibold shadow-md hover:bg-teal-600 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google login */}
          <button
            onClick={handleAuth}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium shadow hover:shadow-md transition"
          >
            <FcGoogle className="w-5 h-5" />
            {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
          </button>

          {/* Toggle link */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-teal-600 font-semibold hover:underline"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
