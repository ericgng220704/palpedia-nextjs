import { useEffect, useState } from "react";
import Pal from "@/components/paldex/pal";

export default function PalList({ searchTerm, selectedTypeFilter }) {
     const [pals, setPals] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          async function fetchPaldex() {
               try {
                    setIsLoading(true);
                    const response = await fetch("/api/paldex");

                    if (!response.ok) {
                         throw new Error(`Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setPals(data);
               } catch (e) {
                    throw new Error("Failed to fetch");
               } finally {
                    setIsLoading(false);
               }
          }

          fetchPaldex();
     }, []);

     if (isLoading) {
          return <p>Loading...</p>;
     }

     const filteredPals = pals.filter((pal) => {
          const palTypes = pal.types.map((type) => type.name);
          const matchesType =
               selectedTypeFilter === "all" ||
               palTypes.includes(selectedTypeFilter);
          const matchesSearch = pal.name
               .toLowerCase()
               .includes(searchTerm.toLowerCase());
          return matchesType && matchesSearch;
     });

     return (
          <div className="pal-list">
               {filteredPals.map((pal) => (
                    <Pal key={pal.id} pal={pal} />
               ))}
          </div>
     );
}
