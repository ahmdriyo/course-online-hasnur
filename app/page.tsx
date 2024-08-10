"use client";
import YouTube from "react-youtube";
import { firestore } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { AiOutlineSchedule, AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Image from "next/image";
import time from "./asset/svg/time.svg";
import { FaRectangleList } from "react-icons/fa6";
interface Course {
  id: string;
  judul: string;
  deskripsi: string;
  durasi: string;
}

interface Material {
  id: string;
  judul: string;
  deskripsi: string;
  linkEmbed: string;
}

const CourseAndMaterialList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [materials, setMaterials] = useState<Record<string, Material[]>>({});
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const opts = {
    height: "170",
    width: "300",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRef = collection(firestore, "course");
        const courseSnapshot = await getDocs(courseRef);
        const allCourses: Course[] = courseSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Course)
        );
        setCourses(allCourses);

        const courseMaterials: Record<string, Material[]> = {};
        for (const courseDoc of courseSnapshot.docs) {
          const materialRef = collection(courseDoc.ref, "material");
          const materialSnapshot = await getDocs(materialRef);
          const courseMaterialList: Material[] = materialSnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Material)
          );
          courseMaterials[courseDoc.id] = courseMaterialList;
        }
        setMaterials(courseMaterials);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const togglePopup = (id: string) => {
    setActiveCourseId(id === activeCourseId ? null : id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setActiveCourseId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/pages/material/editMaterial/${id}`);
  };
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#fff] border-[3px] border-[#EEEEEE] rounded-xl m-1 md:mt-0 h-auto text-black py-4 flex flex-col items-center transition-all duration-300 ease-in-out md:ml-[224px]"
            >
              <div className="flex flex-row justify-between px-7 items-center w-full border-b-[3px] pb-2">
                <div className=" flex flex-row items-center gap-2 ">
                  <MdOutlineVideoLibrary
                    size={22}
                    className=" text-[#EB9251]"
                  />
                  <h1 className="font-poppins font-bold text-[#EB9251]">
                    Course
                  </h1>
                </div>
                <h1 className="font-bold font-poppins">{course.judul}</h1>
                <div>
                  <AiTwotoneSchedule size={22} className=" text-[#EB9251]" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full h-full justify-between sm:items-center items-start px-5 mt-3">
                <p className="w-[70%]">{course.deskripsi}</p>
                <div className="flex flex-row items-center justify-between px-4 bg-[#C1E4D3] w-[150px] h-12 rounded-[10px] mt-3 border-[3px] border-[#D4AEAE] hover:bg-[#b8d9c9]">
                  <Image alt="" src={time} />
                  <p>{course.durasi}</p>
                </div>
              </div>
              {materials[course.id]?.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-row gap-2 items-center justify-center w-[130px] h-8 rounded-md border-[3px] ml-5 border-[#EB9251] bg-transparent hover:bg-[#eae7e4] transition-colors duration-300 ">
                    <FaRectangleList size={20} className="text-[#EB9251] "/>
                    <h2 className="text-[12px] font-bold text-[#EB9251] ">
                      List Materials
                    </h2>
                  </div>

                  {materials[course.id].map((material) => (
                    <div
                      key={material.id}
                      className="bg-[#fff] m-1 md:mt-0 h-auto text-black py-4 flex flex-col items-center transition-all duration-300 ease-in-out"
                    >
                      <div className="flex flex-col lg:flex-row w-full rounded-lg pl-4">
                        <div className="w-full md:w-[34%]">
                          <YouTube videoId={material.linkEmbed} opts={opts} />
                        </div>
                        <div className="flex flex-col w-full ml-0 lg:ml-16 mr-2">
                          <div className="flex items-center justify-between mb-2 lg:mr-0 mr-3">
                            <h1 className="text-xl font-bold text-gray-800">
                              {material.judul}
                            </h1>
                          </div>
                          <div className="p-4 bg-gray-100 rounded-lg text-gray-700 lg:mr-0 mr-3">
                            {material.deskripsi}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseAndMaterialList;
