import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black opacity-90 w-56 absolute top-9 left-0 py-5 flex-col borde flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline text-sm">
          Home
        </div>
        <div className="px-3 text-center text-white hover:underline text-sm">
          Shows
        </div>
        <div className="px-3 text-center text-white hover:underline text-sm">
          Movies
        </div>
        <div className="px-3 text-center text-white hover:underline text-sm">
          Games
        </div>
        <div className="px-3 text-center text-white hover:underline text-sm">
          New & Popular
        </div>
        <div className="px-3 text-center text-white hover:underline text-sm">
          My List
        </div>
        <div className="px-3 text-center text-white hover:underline text-sm">
          Browse by languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
