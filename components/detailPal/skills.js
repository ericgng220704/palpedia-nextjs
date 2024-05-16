import { useEffect, useState } from "react";
import getFireBaseImage from "@/lib/getFireBaseImage";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/helper_functions/helper";

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
          <div className="py-8 px-6 bg-black flex flex-col gap-6 mb-4 rounded-lg">
               <div className="flex justify-between items-center border-b border-solid border-white pb-3">
                    <div className="flex gap-2 items-center">
                         <Image
                              src={imageURL}
                              height={30}
                              width={30}
                              alt={skill.type}
                         />
                         <h3 className="text-3xl text-slate-300 mb-2">
                              {capitalizeFirstLetter(
                                   skill.name.replace("_", " ")
                              )}
                         </h3>
                    </div>
                    <div className="flex gap-2 text-2xl">
                         <span className="bg-zinc-300 px-2 py-1 rounded-xl text-black">
                              Level: {skill.level}
                         </span>
                         <span className="bg-zinc-300 px-4 py-1 rounded-xl text-black">
                              Power: {skill.power}
                         </span>
                         <span className="bg-zinc-300 px-4 py-1 rounded-xl text-black">
                              Cooldown: {skill.cooldown}s
                         </span>
                    </div>
               </div>

               <p>{skill.description}</p>
          </div>
     );
}
