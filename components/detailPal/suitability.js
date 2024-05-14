import { useEffect, useState } from "react";
import getFireBaseImage from "@/lib/getFireBaseImage";
import Image from "next/image";

export default function Suitability({ work }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");

     useEffect(() => {
          setImageName(work.image.split("/works/")[1]);
     }, [work]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "works");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);

     return (
          <div className="flex justify-between py-2 px-6">
               <div className="flex gap-2">
                    <Image src={imageURL} height={20} width={20} />
                    <p>Level:</p>
               </div>
               <p className="text-white">{work.level}</p>
          </div>
     );
}
