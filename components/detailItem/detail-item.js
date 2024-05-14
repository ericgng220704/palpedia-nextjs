import { useEffect, useState } from "react";
import getFireBaseImage from "@/lib/getFireBaseImage";
import Image from "next/image";

export default function DetailItem({ item }) {
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

     return (
          <>
               <div className="mb-8">
                    <Image
                         className="rounded-lg"
                         src={imageURL}
                         height={150}
                         width={150}
                         alt={item.name}
                    />
               </div>
               <div className="mb-4">
                    <h1 className="text-4xl text-slate-300 mb-2">
                         {item.name}
                    </h1>
                    <p>{item.type}</p>
               </div>

               <div className="mb-4">
                    <h2 className="text-3xl text-slate-300 mb-2">
                         About {item.name}
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Weight: </span>
                              <span className="text-white">{item.weight}</span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Gold: </span>
                              <span className="text-white">{item.gold}</span>
                         </div>
                    </div>
               </div>
          </>
     );
}
