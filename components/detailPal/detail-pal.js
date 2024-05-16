import { useEffect, useState } from "react";
import getFireBaseImage from "@/lib/getFireBaseImage";
import Image from "next/image";
import Suitability from "./suitability";
import Skill from "./skills";

export default function DetailPal({ pal }) {
     const [imageURL, setImageURL] = useState("");
     const [imageName, setImageName] = useState("");
     // const imagePath = `${pal.image.split("/public")[1]}`;

     useEffect(() => {
          setImageName(pal.image.split("/paldeck/")[1]);
     }, [pal]);

     useEffect(() => {
          async function fetchImage() {
               if (imageName) {
                    const url = await getFireBaseImage(imageName, "paldeck");
                    setImageURL(url);
               }
          }

          if (imageName) {
               fetchImage();
          }
     }, [imageName]);

     return (
          <div className="px-10 py-14 text-zinc-400 text-3xl font-medium">
               <div className="mb-8">
                    <Image
                         className="rounded-full bg-indigo-100"
                         src={imageURL}
                         height={150}
                         width={150}
                         alt={pal.name}
                    />
               </div>
               <div className="mb-12">
                    <h1 className="text-4xl text-zinc-300 font-bold mb-2">
                         {pal.name}
                    </h1>
                    <p>Paldeck entry #{pal.id}</p>
               </div>

               <div className="mb-12">
                    <h2 className="text-3xl  mb-2 text-zinc-300 font-semibold">
                         About {pal.name}
                    </h2>
                    <p className="text-wrap">{pal.description}</p>
               </div>

               <div className="mb-12">
                    <h2 className="text-3xl text-zinc-300 font-semibold mb-2">
                         Work Suitability
                    </h2>
                    <ul className="grid grid-cols-3 gap-10">
                         {pal.suitability.map((work, index) => {
                              return (
                                   <li
                                        className="bg-black rounded-md"
                                        key={work + index}
                                   >
                                        <Suitability work={work} />
                                   </li>
                              );
                         })}
                    </ul>
               </div>

               <div className="mb-12">
                    <h2 className="text-3xl text-zinc-300 font-semibold mb-2">
                         {pal.name} Partner Skill
                    </h2>
                    <div className="py-8 px-6 flex gap-5 flex-col bg-black rounded-lg">
                         <h3 className="text-3xl text-zinc-300 font-semibold mb-2">
                              {pal.aura.name}
                         </h3>
                         <p>{pal.aura.description}</p>
                    </div>
               </div>

               <div className="mb-12">
                    <h2 className="text-3xl text-zinc-300 font-semibold mb-2">
                         {pal.name} Stats
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>HP: </span>
                              <span className="text-white">{pal.stats.hp}</span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Defense: </span>
                              <span className="text-white">
                                   {pal.stats.defense}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Melee Attack: </span>
                              <span className="text-white">
                                   {pal.stats.attack.melee}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Ranged Attack: </span>
                              <span className="text-white">
                                   {pal.stats.attack.ranged}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Support: </span>
                              <span className="text-white">
                                   {pal.stats.support}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Stamina: </span>
                              <span className="text-white">
                                   {pal.stats.stamina}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Walk Speed: </span>
                              <span className="text-white">
                                   {pal.stats.speed.walk}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Run Speed: </span>
                              <span className="text-white">
                                   {pal.stats.speed.run}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Ride Speed: </span>
                              <span className="text-white">
                                   {pal.stats.speed.ride}
                              </span>
                         </div>
                    </div>
               </div>

               <div className="mb-12">
                    <h2 className="text-3xl text-zinc-300 font-semibold mb-2">
                         {pal.name} Breeding
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Male: </span>
                              <span className="text-white">
                                   {pal.breeding.male_probability}
                              </span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Female: </span>
                              <span className="text-white">
                                   {100 - pal.breeding.male_probability}
                              </span>
                         </div>
                    </div>
               </div>

               <div className="mb-12">
                    <h2 className="text-3xl text-zinc-300 font-semibold mb-2">
                         Extra Information
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>AssetID: </span>
                              <span className="text-white">{pal.asset}</span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Paldex No: </span>
                              <span className="text-white">{pal.id}</span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Genus: </span>
                              <span className="text-white">{pal.genus}</span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Size: </span>
                              <span className="text-white">{pal.size}</span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Rarity: </span>
                              <span className="text-white">{pal.rarity}</span>
                         </div>
                         <div className="bg-black flex justify-between py-3 px-6 rounded-lg">
                              <span>Base Price: </span>
                              <span className="text-white">{pal.price}</span>
                         </div>
                         {pal.types.map((type, index) => {
                              return (
                                   <div
                                        className="bg-black flex justify-between py-3 px-6 rounded-lg"
                                        key={index + type.name}
                                   >
                                        <span>Element {index + 1}: </span>
                                        <span className="text-white">
                                             {type.name}
                                        </span>
                                   </div>
                              );
                         })}
                    </div>
               </div>

               <div className="mb-12">
                    <h2 className="text-3xl text-zinc-300 font-semibold mb-2">
                         {pal.name} Skills
                    </h2>
                    <p>
                         {pal.name} has a total of {pal.skills.length} learnable
                         skills. Lamball gains new skills by levelling up, it
                         can also learn new skills by consuming skill fruits.
                    </p>
                    <ul className="mt-6">
                         {pal.skills.map((skill, index) => {
                              return (
                                   <li key={index + skill.name}>
                                        <Skill skill={skill} />
                                   </li>
                              );
                         })}
                    </ul>
               </div>
          </div>
     );
}
