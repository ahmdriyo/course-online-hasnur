import Image from "next/image";
import React from "react";
import profile from "../asset/profile.jpg";
import { FaPlus } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  let title = "";
  const isEditCourse = pathname.startsWith("/pages/course/editCourse/");
  const isEditMaterial = pathname.startsWith("/pages/material/editMaterial/");
  if (pathname === "/") {
    title = "Home";
  } else if (pathname === "/pages/course") {
    title = "Course";
  } else if (pathname === "/pages/course/addCourse") {
    title = "Add New Course";
  } else if (isEditCourse) {
    title = "Edit Course";
  } else if (pathname === "/pages/material") {
    title = "Material";
  } else if (pathname === "/pages/material/addMaterial") {
    title = "Add New Material";
  } else if (isEditMaterial) {
    title = "Edit Material";
  }
  const handelPushCourse = () => {
    router.push("/pages/course/addCourse");
  };
  const handelPushMaterial = () => {
    router.push("/pages/material/addMaterial");
  };
  return (
    <nav className="bg-[#fff] border-[3px] border-[#EEEEEE] rounded-xl m-1 md:mt-1 mt-16 text-black py-4 px-5 flex items-center justify-between transition-all duration-300 ease-in-out md:ml-[224px] h-20">
      <div className="text-lg font-semibold">{title}</div>
      <div className="flex flex-row items-center">
        {title == "Home" ? (
          <></>
        ) : title == "Course" ? (
          <button
            className="flex flex-row items-center justify-center bg-[#C1E4D3] hover:bg-[#b8ccc2] active:bg-[#a3b7a6] active:scale-95 cursor-pointer border-2 border-[#D4AEAE] rounded-xl w-36 sm:w-40 h-[35px] sm:h-[45px]  mr-2 transition-transform duration-150 ease-in-out"
            onClick={handelPushCourse}
          >
            <FaPlus />
            <h2 className="ml-1 font-bold font-mochiy  text-[12px] sm:text-[15px]">
              Add New {title}
            </h2>
          </button>
        ) : title == "Material" ? (
          <button
            className="flex flex-row items-center justify-center bg-[#C1E4D3] hover:bg-[#b8ccc2] active:bg-[#a3b7a6] active:scale-95 cursor-pointer border-2 border-[#D4AEAE] rounded-xl w-40 h-[45px] mr-2 transition-transform duration-150 ease-in-out"
            onClick={handelPushMaterial}
          >
            <FaPlus />
            <h2 className="ml-1 font-bold font-mochiy text-[15px]">
              Add New {title}
            </h2>
          </button>
        ) : (
          <></>
        )}
        {title === "Home" ? (
          <div className=" flex-row justify-start items-center bg-[#fff] border-2 border-[#EEEEEE] rounded-xl w-44 h-[66px] ml-2 mr-[-10px] flex">
            <div className=" ml-4 ">
              <Image
                alt=""
                src={profile}
                width={40}
                className=" rounded-[100px]"
              />
            </div>
            <div>
              <h1 className="font-bold ml-2  text-[18px]">Andi</h1>
              <p className="font-light ml-2 mt-[-8px] text-[12px]">
                Administator
              </p>
            </div>
          </div>
        ) : (
          <div className=" flex-row justify-start items-center bg-[#fff] border-2 border-[#EEEEEE] rounded-xl w-44 h-[66px] ml-2 mr-[-10px] hidden sm:flex">
            <div className=" ml-4 ">
              <Image
                alt=""
                src={profile}
                width={40}
                className=" rounded-[100px]"
              />
            </div>
            <div>
              <h1 className="font-bold ml-2  text-[18px]">Andi</h1>
              <p className="font-light ml-2 mt-[-8px] text-[12px]">
                Administator
              </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
