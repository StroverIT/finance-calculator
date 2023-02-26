import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsBoxArrowInLeft } from "react-icons/bs";

const LogoutBtn = ({ className }) => {
  return (
    <div
      className={`${className} flex items-center text-sm text-red-600 font-medium`}
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
