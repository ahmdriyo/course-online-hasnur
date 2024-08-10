"use client";
import YouTube from "react-youtube";
import { firestore } from "@/firebaseConfig";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface Material {
  id: string;
  judul: string;
  deskripsi: string;
  linkEmbed: string;
  createdAt?: any; // Tambahkan createdAt dengan tipe any
}

const Material = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const opts = {
    height: "170",
    width: "300",
    playerVars: {
      autoplay: 0,
    },
  };
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const courseRef = collection(firestore, "course");
        const courseSnapshot = await getDocs(courseRef);
        const allMaterials: Material[] = [];
        for (const courseDoc of courseSnapshot.docs) {
          const materialRef = collection(courseDoc.ref, "material");
          const materialSnapshot = await getDocs(materialRef);
          materialSnapshot.forEach((doc) => {
            allMaterials.push({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt // Ambil field createdAt
            } as Material);
          });
        }

        // Sortir materials berdasarkan createdAt (yang paling lama ditambahkan di atas)
        allMaterials.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime();
          }
          return 0;
        });

        setMaterials(allMaterials);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setIsLoading(false);
      }
    };

    fetchMaterials();
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
      <div>
        {materials.map((material) => (
          <div
            key={material.id}
            className="bg-[#fff] border-2 border-[#EEEEEE] rounded-xl m-1 md:mt-0 h-auto text-black py-4 flex flex-col items-center transition-all duration-300 ease-in-out md:ml-[224px]"
          >
            {activeCourseId === material.id && (
              <div
                ref={popupRef}
                className="absolute right-7 mt-2 w-40 bg-white border rounded shadow-lg z-10"
              >
                <button
                  onClick={() => handleEdit(material.id)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>
            )}
            <div className="flex flex-col lg:flex-row w-full rounded-lg pl-4">
              <div className="flex w-[250px] h-[120px] sm:h-[150px] sm:w-[400px]">
                <YouTube
                  videoId={material.linkEmbed}
                  opts={{
                    height: "100%",
                    width: "100%",
                  }}
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col w-full ml-0 lg:ml-16  mr-2">
                <div className="flex items-center justify-between mb-2 lg:mr-0 mr-3">
                  <h1 className="text-xl font-bold text-gray-800">
                    {material.judul}
                  </h1>
                  <button
                    onClick={() => togglePopup(material.id)}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <HiDotsVertical size={20} />
                  </button>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-gray-700 lg:mr-0 mr-3">
                  {material.deskripsi}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Material;
