import Link from "next/link";
import Image from "next/image";
import getFireBaseImage from "@/lib/getFireBaseImage";
import { useEffect, useState } from "react";

export default function Item({ item }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");

     useEffect(() => {
          setImageName(item.image.split("/items/")[1]);
     }, [item]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "items");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);
     const itemDetailPath = `/items/${item.key}`;
     return (
          <Link href={itemDetailPath}>
               <div className="item flex gap-3 flex-col">
                    <div className="flex justify-start items-center gap-8">
                         <div className="item-image">
                              {imageURL ? (
                                   <Image
                                        src={imageURL}
                                        height={40}
                                        width={40}
                                        alt={item.name}
                                   />
                              ) : (
                                   <p>Loading image...</p>
                              )}
                         </div>
                         <div>
                              <h3>{item.name}</h3>
                              <p className="text-slate-400 text-2xl">
                                   {item.type}
                              </p>
                         </div>
                    </div>

                    <div className="grid grid-cols-2">
                         <div className="text-slate-400 text-2xl">
                              Gold: {item.gold}
                         </div>

                         <div className="text-slate-400 text-2xl">
                              Weight: {item.weight}
                         </div>
                    </div>
               </div>
          </Link>
     );
}
