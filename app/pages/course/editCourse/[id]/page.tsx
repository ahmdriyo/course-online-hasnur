"use client";
import { firestore } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
const EditCourse = ({ params } : any) => {
  const [dataCourse, setDataCourse] = useState({
    judul: "",
    deskripsi: "",
    durasi: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (params.id) {
      const fetchCourse = async () => {
        const docRef = doc(firestore, "course", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDataCourse(docSnap.data() as any);
        } else {
          console.log("No such document!");
        }
      };
      fetchCourse();
    }
  }, [params.id]);

  const handleUpdate = async (event : any) => {
    event.preventDefault();
    if (params.id) {
      const docRef = doc(firestore, "course", params.id);
      await updateDoc(docRef, dataCourse);
      alert("Data update successfully");
      router.push("/pages/course");
    }
  };
  return (
    <div className="bg-[#fff] border-2 border-[#EEEEEE] rounded-xl m-1 md:mt-0 h-auto text-black py-4 px-5 flex items-center justify-between transition-all duration-300 ease-in-out md:ml-[224px]">
        <div className=" w-[90vw]">
          <div className="flex flex-row items-center cursor-pointer" onClick={() => router.push('/pages/course')}>
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Back</h1>
          </div>
          <form className="w-full mx-auto" onSubmit={handleUpdate}>
            <h3 className="font-bold text-xl mb-5 mt-2">Edit Input Course</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
              <input
                value={dataCourse.judul}
                onChange={(e) =>
                  setDataCourse({ ...dataCourse, judul: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
              <input
                value={dataCourse.deskripsi}
                onChange={(e) =>
                  setDataCourse({ ...dataCourse, deskripsi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Durasi</label>
              <input
                value={dataCourse.durasi}
                onChange={(e) =>
                  setDataCourse({ ...dataCourse, durasi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </form>
        </div>
      </div>
  );
};
export default EditCourse;
