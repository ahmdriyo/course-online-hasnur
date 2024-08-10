"use client";
import { firestore } from "@/firebaseConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const EditMaterial = ({ params }: any) => {
  const [dataMaterial, setDataMaterial] = useState({
    judul: "",
    deskripsi: "",
    linkEmbed: "",
  });

  const [courseList, setCourseList] = useState<{ id: string; judul: string }[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourseData = () => {
      const unsubscribe = onSnapshot(collection(firestore, "course"), (querySnapshot) => {
        const courseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          judul: doc.data().judul as string,
        }));
        setCourseList(courseData);
      });
      return () => unsubscribe(); 
    };
    fetchCourseData();
  }, []);

  useEffect(() => {
    const fetchMaterial = async () => {
      if (params.id && courseList.length > 0) {
        const docRef = doc(firestore, "material", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const materialData = docSnap.data() as any;
          setDataMaterial(materialData);
          // Simpan ID kursus dari data material jika tersedia
          const course = courseList.find(c => c.judul === materialData.nameCourse);
          if (course) {
            setSelectedCourseId(course.id);
          }
        } else {
          let found = false;
          for (let course of courseList) {
            const subDocRef = doc(firestore, `course/${course.id}/material`, params.id);
            const subDocSnap = await getDoc(subDocRef);
            if (subDocSnap.exists()) {
              const materialData = subDocSnap.data() as any;
              setDataMaterial(materialData);
              setSelectedCourseId(course.id); // Set ID kursus yang ditemukan
              found = true;
              break;
            }
          }
          if (!found) {
            console.log("No such document in both 'material' collection and course subcollections!");
          }
        }
      }
    };
    fetchMaterial();
  }, [params.id, courseList]);

  const handleUpdate = async (event: any) => {
    event.preventDefault();
    console.log("Memulai proses update...");
    console.log("params.id:", params.id);
    console.log("dataMaterial:", dataMaterial);
    if (selectedCourseId && params.id) {
      try {
        const docRef = doc(firestore, `course/${selectedCourseId}/material`, params.id);
        console.log("Document reference:", docRef.path);
        await updateDoc(docRef, dataMaterial);
        console.log("Data updated successfully.");
        alert("Data updated successfully.");
        router.push("/pages/material");
      } catch (error: any) {
        console.error("Error updating document:", error.message);
        alert("error updateing the document. Please try again.");
      }
    } else {
      console.error("selectedCourseId or params.id is undefined or invalid.");
    }
  };
  const handleDelete = async (event : any) => {
    event.preventDefault();
    if (selectedCourseId && params.id) {
      try {
        const docRef = doc(firestore, `course/${selectedCourseId}/material`, params.id);
        await deleteDoc(docRef);
        alert("Document deleted successfully.");
        router.push("/pages/material");
      } catch (error: any) {
        console.error("Error deleting document:", error.message);
        alert("error deleting the document. Please try again.");
      }
    } else {
      console.error("selectedCourseId or params.id is undefined or invalid.");
    }
  };
  return (
    <div className="bg-[#fff] border-2 border-[#EEEEEE] rounded-xl m-1 md:mt-0 h-auto text-black py-4 px-5 flex items-center justify-between transition-all duration-300 ease-in-out md:ml-[224px]">
      <div className=" w-[90vw]">
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={() => router.push("/pages/material")}
        >
          <FaArrowLeftLong />
          <h1 className="font-bold ml-2">Back</h1>
        </div>
        <form className="w-full mx-auto" >
          <h3 className="font-bold text-xl mb-5 mt-2">Edit Input Material</h3>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Judul
            </label>
            <input
              value={dataMaterial.judul}
              onChange={(e) =>
                setDataMaterial({ ...dataMaterial, judul: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Deskripsi
            </label>
            <input
              value={dataMaterial.deskripsi}
              onChange={(e) =>
                setDataMaterial({ ...dataMaterial, deskripsi: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              link Embed
            </label>
            <input
              value={dataMaterial.linkEmbed}
              onChange={(e) =>
                setDataMaterial({ ...dataMaterial, linkEmbed: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            onClick={handleUpdate}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
          <button
          onClick={handleDelete}
          className="mt-4 ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Delete
        </button>
        </form>
      </div>
    </div>
  );
};

export default EditMaterial;
