'use client';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../../../../firebaseConfig';
const AddCourse = () => {
  const router = useRouter();
  const [addData, setAddData] = useState({
    judul: "",
    deskripsi: "",
    durasi: "",
  });

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    if (addData.judul.trim() !== "" && addData.deskripsi.trim() !== "" && addData.durasi.trim() !== "") {
      try {
        const dataRef = collection(firestore, "course");
        await addDoc(dataRef, addData);
        alert("Data saved successfully.");
        router.push("/pages/course");
      } catch (error) {
        console.error("Error adding document:", error);
        alert("An error occurred while saving the data. Please try again.");
      }
    } else {
      alert("Please complete all fields.");
    }
  };

  return (
      <div className="bg-[#fff] border-2 border-[#EEEEEE] rounded-xl m-1 md:mt-0 h-auto text-black py-4 px-5 flex items-center justify-between transition-all duration-300 ease-in-out md:ml-[224px]">
        <div className=" w-[90vw]">
          <div className="flex flex-row items-center cursor-pointer" onClick={() => router.push('/pages/course')}>
            <FaArrowLeftLong />
            <h1 className="font-bold ml-2">Back</h1>
          </div>
          <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <h3 className="font-bold text-xl mb-5 mt-2">Input New Course</h3>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
              <input
                value={addData.judul}
                onChange={(e) =>
                  setAddData({ ...addData, judul: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
              <input
                value={addData.deskripsi}
                onChange={(e) =>
                  setAddData({ ...addData, deskripsi: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Durasi</label>
              <input
                value={addData.durasi}
                onChange={(e) =>
                  setAddData({ ...addData, durasi: e.target.value })
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

export default AddCourse;
