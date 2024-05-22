import { useEffect, useState } from "react";
import Link from "next/link";
import PalImage from "./palImage";

export default function ListCounterPals({ palElement }) {
     const [pals, setPals] = useState();
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          async function fetchCounterPals() {
               try {
                    setIsLoading(true);
                    const response = await fetch(
                         "/api/mongodb/findPalsWithEl",
                         {
                              method: "POST",
                              headers: {
                                   "Content-type": "application/json",
                              },
                              body: JSON.stringify({ type: palElement }),
                         }
                    );

                    const data = await response.json();

                    setPals(data);
               } catch (e) {
                    throw new Error("Failed to fetch!!");
               } finally {
                    setIsLoading(false);
               }
          }

          fetchCounterPals();
     }, [palElement]);

     if (isLoading) {
          return <p>Loading...</p>;
     }

     return (
          <ul className="flex flex-col gap-4">
               {pals.map((pal) => {
                    const palDetailPath = `/paldex/${pal.id}`;
                    return (
                         <li className="hover:text-indigo-400" key={pal.id}>
                              <Link href={palDetailPath}>
                                   <div className="flex items-center gap-4 px-4 py-2">
                                        <PalImage
                                             pal={pal}
                                             height={30}
                                             width={30}
                                        />
                                        <p>{pal.name}</p>
                                   </div>
                              </Link>
                         </li>
                    );
               })}
          </ul>
     );
}
