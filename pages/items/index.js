import ItemList from "@/components/items/item-list";
import { useState } from "react";

export default function ItemsPage() {
     const [searchTerm, setSearchTerm] = useState("");
     return (
          <div className="font-medium text-zinc-400 text-3xl">
               <div className="mb-12 mt-8">
                    <input
                         id="live-search-bar"
                         className="w-full py-4 px-6 text-black bg-white mb-8"
                         type="text"
                         placeholder="Search item name"
                         name="search-bar"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <h2 className="text-4xl text-slate-300 mb-2">
                         Palworld Items
                    </h2>
                    <p className=" text-slate-400 text-3xl">
                         Explore thousands of Palworld Items using our Palworld
                         Item List
                    </p>
               </div>
               <ItemList searchTerm={searchTerm} />
          </div>
     );
}
