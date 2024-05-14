import { useEffect, useState } from "react";
import Link from "next/link";
import ItemImage from "./itemImage";

export default function HomeItemList() {
     const [items, setItems] = useState();
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          async function fetchCounterPals() {
               try {
                    setIsLoading(true);
                    const response = await fetch("/api/homeItemList");

                    const data = await response.json();
                    console.log(data);
                    setItems(data);
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
               {items.map((item) => {
                    const itemDetailPath = `/items/${item.key}`;
                    return (
                         <li
                              className="h-16 bg-black hover:text-yellow-400"
                              key={item.key}
                         >
                              <Link href={itemDetailPath}>
                                   <div className="flex items-center gap-4 px-4 py-2">
                                        <ItemImage
                                             item={item}
                                             height={30}
                                             width={30}
                                        />
                                        <p>{item.name}</p>
                                   </div>
                              </Link>
                         </li>
                    );
               })}
          </ul>
     );
}