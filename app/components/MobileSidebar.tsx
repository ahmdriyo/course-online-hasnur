"use client";
import React from "react";
import Link from "next/link";
import { FiMenu as Icon } from "react-icons/fi";
import Image from "next/image";
import hasnurIcon from "../asset/hasnurIcon.png";
interface Mobile {
  setter: any;
}

const MobileSidebar: React.FC<Mobile> = ({ setter }) => {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-[#b0c752] flex [&>*]:my-auto px-2">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
      >
        <Icon />
      </button>
      <Link href="/" className="mx-auto"></Link>
      <Link className="text-3xl flex text-white" href="/">
        <Image alt="hasnurIcon" width={40} src={hasnurIcon}/>
      </Link>
    </nav>
  );
};
export default MobileSidebar;
