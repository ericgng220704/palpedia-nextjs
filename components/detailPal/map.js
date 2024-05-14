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
          <div className="text-slate-400 text-2xl">
               <h2 className="text-3xl text-slate-300 mb-2">
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
                              height={300}
                              width={300}
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
                              className=" text-yellow-400 hover:text-yellow-200"
                         >
                              Switch to {dayState === "day" ? "Night" : "Day"}
                         </button>
                    </div>
               </div>
          </div>
     );
}
