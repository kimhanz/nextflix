import React from "react";
import NavbarItem from "./NavbarItem";
import { BiCaretDown } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 py-3 md:px-12 md:py-4 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
        <img
          className="h-6 w-20 lg:h-[2.5rem] lg:w-29"
          src="/images/logo.png"
          alt="logo"
        />
        {/* Desktop */}
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Shows" />
          <NavbarItem label="Movies" />
          <NavbarItem label="Games" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        {/* Moblie */}
        <div className="lg:hidden flex flex-row items-center ml-8 cursor-pointer relative">
          <p className="text-white md:text-sm text-xs ">Browse</p>
          <BiCaretDown className="text-white transition" size={24} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
