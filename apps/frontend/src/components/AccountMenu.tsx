import React from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-13 right-0 py-5 flex-col flex opacity-90">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rouneded-md"
            src="/images/default-image.jpg"
            alt="profile"
          />
          <p className="text-white text-sm group-hover/item:underline ">
            Username
          </p>
        </div>
        <hr className="bg-gray-600 botder-0 h-px my-4" />
        <div className="px-3 text-center text-white text-sm hover:underline">
          Sign out of Nextflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
