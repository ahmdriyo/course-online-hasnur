"use client";
import { firestore } from "@/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import time from "../../asset/svg/time.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Course {
  id: string;
  judul: string;
  deskripsi: string;
  durasi: string;
}
const Course = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const dataRef = collection(firestore, "course");
    const unsubscribe = onSnapshot(
      dataRef,
      (snapshot) => {
        const coursesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Course[];
        setCourses(coursesData);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    );
    return () => unsubscribe();
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
    router.push(`/pages/course/editCourse/${id}`);
  };
  const handleDelete = async (event: any, id: any) => {
    event.preventDefault();
    if (id) {
      try {
        const docRef = doc(firestore, "course", id);
        await deleteDoc(docRef);
        alert("Data successfully delete");
        router.refresh();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  return (
    <div>
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-[#fff] border-[3px] border-[#EEEEEE] rounded-xl m-1 md:mt-0 h-auto text-black py-4 flex flex-col items-center transition-all duration-300 ease-in-out md:ml-[224px]"
        >
          <div className="flex flex-row justify-between px-7 items-center w-full border-b-2 pb-2">
            <AiOutlineSchedule size={33} />
            <h1 className="font-bold font-poppins">{course.judul}</h1>
            <button onClick={() => togglePopup(course.id)}>
              <HiDotsVertical size={20} />
            </button>
          </div>
          {activeCourseId === course.id && (
            <div
              ref={popupRef}
              className="absolute right-7 mt-2 w-40 bg-white border rounded shadow-lg z-10"
            >
              <button
                onClick={() => handleEdit(course.id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={(event) => handleDelete(event, course.id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Hapus
              </button>
            </div>
          )}
          <div className="flex flex-col sm:flex-row w-full h-full justify-between items-center px-1 sm:px-7 mt-3">
            <p className="w-[70%]">{course.deskripsi}</p>
            <div className="flex flex-row sm:mt-1 mt-4 items-center justify-between px-4 bg-[#C1E4D3] w-[150px] h-12 rounded-[10px] border-[3px] border-[#D4AEAE] hover:bg-[#b8d9c9]">
              <Image alt="" src={time} />
              <p>{course.durasi}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Course;
