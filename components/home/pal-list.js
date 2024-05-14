import { useEffect, useState } from "react";
import Link from "next/link";
import PalImage from "../detailPal/palImage";

export default function HomePalList() {
     const [pals, setPals] = useState();
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          async function fetchCounterPals() {
               try {
                    setIsLoading(true);
                    const response = await fetch("/api/homepallist");

                    const data = await response.json();
                    console.log(data);
                    setPals(data);
               } catch (e) {
                    throw new Error("Failed to fetch!!");
               } finally {
                    setIsLoading(false);
               }
          }

          fetchCounterPals();
     }, []);

     if (isLoading) {
          return <p>Loading...</p>;
     }

     return (
          <ul className="flex flex-col gap-4">
               {pals.map((pal) => {
                    const palDetailPath = `/paldex/${pal.id}`;
                    return (
                         <li
                              className="h-16 bg-black hover:text-yellow-400"
                              key={pal.id}
                         >
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
