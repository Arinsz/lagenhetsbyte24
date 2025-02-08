import React from "react";

const Button = () => {
  return (
    <button className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative px-5 py-3 bg-blue-950 rounded-lg leading-none flex items-center">
        <span className="text-blue-200 group-hover:text-white transition duration-200">
          Get Started
        </span>
        <svg
          className="w-5 h-5 text-blue-200 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </button>
  );
};

export default Button;
