"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-stone-500 text-white px-4 py-1 rounded-md  hover:bg-stone-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
