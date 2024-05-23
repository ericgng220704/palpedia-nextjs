import { useState } from "react";
import Image from "next/image";
import PalImage from "../detailPal/palImage";

export default function PalSelectionOverlay({
     pals,
     setShowOverlay,
     handlePalSelection,
}) {
     const [searchTerm, setSearchTerm] = useState("");

     const filteredPals = pals.filter((pal) =>
          pal.name.toLowerCase().includes(searchTerm.toLowerCase())
     );

     return (
          <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-10">
               <div className="bg-zinc-900 rounded-lg shadow-lg w-1/2 p-8">
                    <div className="relative mb-4 flex gap-4">
                         <input
                              type="text"
                              placeholder="Search Pal"
                              className="w-full py-2 px-4 rounded-lg bg-zinc-800 text-white focus:outline-none"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                         />

                         <div>
                              <button
                                   className="p-4 bg-red-400 rounded-xl"
                                   onClick={() => setShowOverlay(false)}
                              >
                                   Close
                              </button>
                         </div>
                    </div>
                    <div className="flex flex-wrap gap-4 max-h-120 overflow-y-auto">
                         {filteredPals.map((pal) => (
                              <button
                                   key={pal.name}
                                   className="flex gap-3 items-center bg-zinc-800 px-4 py-1 rounded-lg"
                                   onClick={() => handlePalSelection(pal)}
                              >
                                   <PalImage
                                        pal={pal}
                                        width={25}
                                        height={25}
                                        alt={pal.name}
                                   />
                                   <span className="mt-2 text-white">
                                        {pal.name}
                                   </span>
                              </button>
                         ))}
                    </div>
               </div>
          </div>
     );
}
