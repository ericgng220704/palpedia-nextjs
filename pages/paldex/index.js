import { useState } from "react";
import PalList from "@/components/paldex/pal-list";
import TypeFilters from "@/components/paldex/type-filters";

export default function PaldexPage() {
     const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
     const [searchTerm, setSearchTerm] = useState("");

     return (
          <div className="Paldex text-zinc-400 text-3xl font-medium mt-8">
               <input
                    id="live-search-bar"
                    className="w-full py-4 px-6 text-black bg-white mb-8"
                    type="text"
                    placeholder="Search Pal name"
                    name="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
               />

               <div className="group2 grid grid-cols-2 mb-8">
                    <div className="dmm pr-36 py-6">
                         <h2 className="text-4xl text-zinc-300 mb-2">
                              PalWorld Paldex
                         </h2>
                         <p className=" text-slate-400 text-3xl">
                              Search, Browse & filter through Pals in our
                              unofficial Palworld Paldeck
                         </p>
                    </div>

                    <div className="h-full">
                         <TypeFilters
                              setSelectedTypeFilter={setSelectedTypeFilter}
                         />
                    </div>
               </div>

               <PalList
                    searchTerm={searchTerm}
                    selectedTypeFilter={selectedTypeFilter}
               />
          </div>
     );
}
