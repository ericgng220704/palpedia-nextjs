import SkillList from "@/components/passive-skills/skill-list";
import { useState } from "react";

export default function PassiveSkillsPage() {
     const [searchTerm, setSearchTerm] = useState("");

     return (
          <div className="font-medium text-zinc-400 text-3xl flex flex-col gap-8">
               <input
                    id="live-search-bar"
                    className="w-full py-4 px-6 text-black bg-white mt-8"
                    type="text"
                    placeholder="Search Skill name"
                    name="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
               />
               <div className="my-4">
                    <h1 className="text-4xl text-slate-300 mb-2">
                         Palworld Passive Skills
                    </h1>
                    <p className=" text-slate-400 text-3xl">
                         Passive skills are traits that can be passed down in
                         breeding they can positively or negatively impact Pals
                    </p>
               </div>

               <SkillList searchTerm={searchTerm} />
          </div>
     );
}
