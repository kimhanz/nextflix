import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-black text-white">
      <h1 className="text-xl font-bold">Nextflix</h1>
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-1 rounded bg-gray-800 text-white"
      />
    </nav>
  );
};

export default Navbar;
