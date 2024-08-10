"use client";
import React from "react";
import Link from "next/link";
import { SlHome } from "react-icons/sl";
import { FaRoute, FaBusAlt, FaChalkboardTeacher } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
import hasnurIcon from "../asset/hasnurIcon.png";
import imgCourse from "../asset/imgCourse.png";
import { SiBookstack } from "react-icons/si";

export default function Sidebar({ show, setter }: any) {
  const pathname = usePathname();
  const className =
    "bg-[#fff] w-[220px] transition-[margin-left] ease-in-out duration-500 fixed top-0 bottom-0 left-0 z-40 border-r-2 border-[#EEEEEE]";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  type MenuItemProps = {
    icon: React.ReactNode;
    name: string;
    route: string;
    onClick?: () => void;
  };

  const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    name,
    route,
    onClick,
  }) => {
    const isHomeActive = route === '/' && (pathname === '/' || pathname === '');  
    const isActive = route !== '/' && pathname.startsWith(route);
    const activeClass = isHomeActive || isActive
      ? "flex items-center bg-[#8BA039] text-white w-[200px] ml-2 mr-2 pl-[17px] rounded-md"
      : "text-[#686f6d] hover:text-[#000]";
    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: any) => !oldVal);
        }}
        className={`flex gap-1 items-center [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${activeClass}`}
      >
        <div className="text-xl flex  [&>*]:mx-auto w-[30px] ">{icon}</div>
        <div onClick={onClick}>{name}</div>
      </Link>
    );
  };

  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: any) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex justify-center items-center">
          <Link href="/" className="flex justify-center flex-row items-center mr-5">
            <Image alt="" src={hasnurIcon} width={50} />
            <h2 className="text-[#000] ml-2 font-bold font-mochiy">
              Course Online
            </h2>
          </Link>
        </div>
        <div className="flex flex-col mt-4">
          <MenuItem name="Home" route="/" icon={<SlHome />} />
          <MenuItem name="Course" route="/pages/course" icon={<FaChalkboardTeacher />} />
          <MenuItem name="Material" route="/pages/material" icon={<SiBookstack />} />
        </div>
        <div className="flex justify-center mt-[45vh]">
          <Image alt="course" src={imgCourse} width={150} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
