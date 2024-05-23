import Image from "next/image";
import { useEffect, useState } from "react";
import PalSelectionOverlay from "./selectPalOverlay";
import PalImage from "../detailPal/palImage";

export default function Calculator1({ data }) {
     const initialPal = 100;
     const [showOverlay, setShowOverlay] = useState(false);
     const [pals, setPals] = useState([]);
     const [palLoading, setPalLoading] = useState(true);
     const [selectedPal, setSelectedPal] = useState();
     const [breedingResults, setBreedingResults] = useState(data[initialPal]);
     // const [searchTerm, setSearchTerm] = useState("");

     useEffect(() => {
          async function fetchPals() {
               try {
                    setPalLoading(true);

                    const response = await fetch("/api/mongodb/paldex");

                    if (!response.ok) {
                         throw new Error(`Status: ${response.status}`);
                    }

                    const data = await response.json();

                    setPals(data);
                    setSelectedPal(data[initialPal]);
               } catch (e) {
                    throw new Error(e);
               } finally {
                    setPalLoading(false);
               }
          }

          fetchPals();
     }, []);

     function handlePalSelection(pal) {
          setSelectedPal(pal);
          setBreedingResults(data[pal.key]);
          setShowOverlay(false);
     }

     if (palLoading) {
          return <p>Loading...</p>;
     }

     console.log(data);

     return (
          <div className="p-6">
               <div className="calculator--1 bg-zinc-900 rounded-lg shadow-lg">
                    <div>
                         <div className="flex flex-col justify-center w-full p-4 text-center">
                              <div className="relative mx-auto mb-4">
                                   <PalImage
                                        pal={selectedPal}
                                        width={150}
                                        height={150}
                                        alt={selectedPal.name}
                                   />
                              </div>
                              <h2 className="text-xl font-semibold">
                                   {selectedPal && selectedPal.name}
                              </h2>
                              <p className="text-sm text-gray-400">
                                   Breeding Rank:{" "}
                                   {selectedPal && selectedPal.breeding.rank}
                              </p>
                         </div>
                         <div className="w-full flex justify-center items-center py-8">
                              <button
                                   onClick={() => setShowOverlay(true)}
                                   className="px-8 border border-solid border-white border-opacity-75"
                              >
                                   Select Pal
                              </button>
                         </div>

                         {showOverlay && !palLoading ? (
                              <PalSelectionOverlay
                                   pals={pals}
                                   setShowOverlay={setShowOverlay}
                                   handlePalSelection={handlePalSelection}
                              />
                         ) : null}
                    </div>
                    <div className="flex-grow p-4">
                         {/* <div className="relative mb-4">
                              <input
                                   type="text"
                                   placeholder="Search Parent Pal"
                                   className="w-full py-2 px-4 rounded-lg bg-zinc-800 text-indigo-100 focus:outline-none -z-10"
                                   value={searchTerm}
                                   onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                   }
                              />
                         </div> */}

                         <div className="max-h-96 overflow-y-scroll">
                              <table className="w-full table-fixed">
                                   <thead>
                                        <tr className="grid grid-cols-3">
                                             <th>Parent Pal 1</th>
                                             <th>Parent Pal 2</th>
                                             <th>Egg/Child Pal</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {breedingResults.map(
                                             (breeding, index) => {
                                                  const children1 = pals.find(
                                                       (pal) =>
                                                            pal.key ===
                                                            breeding[0]
                                                  );
                                                  const children2 = pals.find(
                                                       (pal) =>
                                                            pal.key ===
                                                            breeding[1]
                                                  );

                                                  return (
                                                       <tr
                                                            className="grid grid-cols-3"
                                                            key={index}
                                                       >
                                                            <td className="py-2 flex gap-4 items-center justify-start">
                                                                 <PalImage
                                                                      pal={
                                                                           children1
                                                                      }
                                                                      height={
                                                                           40
                                                                      }
                                                                      width={40}
                                                                      alt={
                                                                           children1.name
                                                                      }
                                                                 />
                                                                 <span>
                                                                      {`${children1.name} (${children1.breeding.rank})`}
                                                                 </span>
                                                            </td>
                                                            <td className="py-2 flex gap-4 items-center justify-start">
                                                                 <PalImage
                                                                      pal={
                                                                           children2
                                                                      }
                                                                      height={
                                                                           40
                                                                      }
                                                                      width={40}
                                                                      alt={
                                                                           children2.name
                                                                      }
                                                                 />
                                                                 <span>
                                                                      {`${children2.name} (${children2.breeding.rank})`}
                                                                 </span>
                                                            </td>
                                                            <td className="py-2 flex gap-4 items-center justify-center">
                                                                 <PalImage
                                                                      pal={
                                                                           selectedPal
                                                                      }
                                                                      height={
                                                                           40
                                                                      }
                                                                      width={40}
                                                                      alt={
                                                                           selectedPal.name
                                                                      }
                                                                 />
                                                                 <span>
                                                                      {`${selectedPal.name} (${selectedPal.breeding.rank})`}
                                                                 </span>
                                                            </td>
                                                       </tr>
                                                  );
                                             }
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </div>
     );
}
