import { useEffect, useState } from "react";
import getFireBaseImage from "@/lib/getFireBaseImage";
import Image from "next/image";

export default function PalSpawnMap({ pal }) {
     const [dayState, setDayState] = useState("day");
     const [imageURL, setImageURL] = useState("");
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     useEffect(() => {
          async function fetchImage() {
               setLoading(true);
               setError("");
               const imageName = `${pal.key}-${dayState}.png`;
               try {
                    const url = await getFireBaseImage(imageName, "maps");
                    if (url) {
                         setImageURL(url);
                         setError("");
                    } else {
                         throw new Error("Image not found.");
                    }
               } catch (err) {
                    setImageURL("");
                    setError(
                         `${pal.name} does not spawn during the ${dayState}.`
                    );
               } finally {
                    setLoading(false);
               }
          }

          fetchImage();
     }, [pal.key, dayState, pal.name]);

     function toggleDayState() {
          setDayState((prevState) => (prevState === "day" ? "night" : "day"));
     }

     return (
          <div className="">
               <h2 className="text-4xl font-semibold mb-2">
                    {pal.name} Spawn Location
               </h2>
               <div>
                    {loading ? (
                         <div className="errorMessage">
                              <p>Loading...</p>
                         </div>
                    ) : error ? (
                         <div className="errorMessage">
                              <p>{error}</p>
                         </div>
                    ) : (
                         <Image
                              src={imageURL}
                              alt={`${pal.name} location during ${dayState}`}
                              height={330}
                              width={330}
                         />
                    )}
                    <div className="flex justify-between bg-black py-4 px-2">
                         <p>
                              Current:{" "}
                              {dayState.charAt(0).toUpperCase() +
                                   dayState.slice(1)}
                         </p>
                         <button
                              onClick={toggleDayState}
                              className=" text-indigo-400 hover:text-indigo-200"
                         >
                              Switch to {dayState === "day" ? "Night" : "Day"}
                         </button>
                    </div>
               </div>
          </div>
     );
}
