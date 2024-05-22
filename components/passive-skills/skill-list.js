import { capitalizeFirstLetter } from "@/lib/helper_functions/helper";
import { useState, useEffect } from "react";

export default function SkillList({ searchTerm }) {
     const [skills, setSkills] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          async function fetchPassiveSkills() {
               try {
                    setIsLoading(true);
                    const response = await fetch("/api/mongodb/passiveSkills");
                    if (!response.ok) {
                         throw new Error(`Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setSkills(data);
               } catch (e) {
                    throw new Error(e);
               } finally {
                    setIsLoading(false);
               }
          }

          fetchPassiveSkills();
     }, []);

     if (isLoading) {
          <p>Loading...</p>;
     }

     const selectedSkills = skills.filter((skill) => {
          return skill.name.toLowerCase().includes(searchTerm.toLowerCase());
     });

     return (
          <ul className="bg-zinc-900 p-8 rounded-3xl text-2xl">
               <div className="passiveSkill-item pb-6 border-b border-solid border-zinc-800">
                    <span>NAME</span>
                    <div>
                         <p>DESCRIPTION</p>
                    </div>
               </div>
               {selectedSkills.map((skill) => {
                    let nameColor;
                    if (skill.tier > 1) {
                         nameColor = "text-yellow-500 opacity-95";
                    } else if (skill.tier < 0) {
                         nameColor = "text-red-400";
                    } else {
                         nameColor = "text-zinc-400";
                    }
                    return (
                         <div className="passiveSkill-item py-6 border-b border-solid border-zinc-800">
                              <span className={`${nameColor}`}>
                                   {capitalizeFirstLetter(skill.name)}
                              </span>
                              <div className="flex gap-4 opacity-80">
                                   <p>
                                        {skill.positive
                                             ? skill.positive + ", "
                                             : "" + skill.negative}
                                   </p>
                              </div>
                         </div>
                    );
               })}
          </ul>
     );
}
