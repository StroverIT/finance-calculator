import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsBoxArrowInLeft } from "react-icons/bs";

const LogoutBtn = () => {
  return (
    <div
      className="flex items-center mb-10 text-sm text-red-600 font-medium"
      onClick={() => signOut()}
    >
      <div className="mr-1 text-xl">
        <BsBoxArrowInLeft />
      </div>
      <Link href="/" className="text-lg">
        Изход
      </Link>
    </div>
  );
};

export default LogoutBtn;
