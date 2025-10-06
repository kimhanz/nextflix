"use client";

import React, { useCallback, useEffect, useState } from "react";

import { BiCaretDown } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import Image from "next/image";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMoblieMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 py-3 md:px-12 md:py-4 flex flex-row items-center transition duration-500 ${
          showBackground
            ? "bg-zinc-900"
            : "bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)] z-[1]"
        }`}
      >
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
        {/* Mobile */}
        <div
          onClick={toggleMoblieMenu}
          className="lg:hidden flex flex-row items-center ml-8 cursor-pointer relative"
        >
          <p className="text-white md:text-sm text-xs ">Browse</p>
          <BiCaretDown className="text-white transition" size={24} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <RiSearchLine size={26} />
          </div>
          <div className="hidden md:inline text-gray-200 hover:text-gray-300 cursor-pointer text-sm">
            Kids
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <FaRegBell size={22} />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-8 h-8 rounded-md overflow-hidden">
              <Image src="/images/default-image.jpg" alt="profile" />
            </div>
            <BiCaretDown
              className={`hidden md:inline-block text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              } `}
              size={24}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
