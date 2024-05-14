import { useEffect, useState } from "react";
import getFireBaseImage from "@/lib/getFireBaseImage";
import Image from "next/image";

export default function Skill({ skill }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");

     useEffect(() => {
          setImageName(`${skill.type}.png`);
     }, [skill]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "elements");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);

     return (
          <div className="p-4 bg-black flex flex-col gap-6 mb-4 rounded-lg">
               <div className="flex justify-between items-center border-b border-solid border-white">
                    <div className="flex gap-2 ">
                         <Image
                              src={imageURL}
                              height={20}
                              width={20}
                              alt={skill.type}
                         />
                         <h3 className="text-3xl text-slate-300 mb-2">
                              {skill.name}
                         </h3>
                    </div>
                    <div className="flex gap-5">
                         <span className="bg-white px-4 py-1 rounded-xl text-black">
                              Level: {skill.level}
                         </span>
                         <span className="bg-white px-4 py-1 rounded-xl text-black">
                              Power: {skill.power}
                         </span>
                         <span className="bg-white px-4 py-1 rounded-xl text-black">
                              Cooldown: {skill.cooldown}s
                         </span>
                    </div>
               </div>

               <p>{skill.description}</p>
          </div>
     );
}
