import Calculator1 from "@/components/breeding/calculator1";
import { useEffect, useState } from "react";

export default function BreedingPage() {
     const [data, setData] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          async function fetchBreeding() {
               try {
                    setIsLoading(true);

                    const response = await fetch("/api/mongodb/breeding");

                    if (!response.ok) {
                         throw new Error(`Status: ${response.status}`);
                    }

                    const data = await response.json();
                    setData(data);
               } catch (e) {
                    throw new Error(e);
               } finally {
                    setIsLoading(false);
               }
          }

          fetchBreeding();
     }, []);

     if (isLoading) {
          return <p>Loading...</p>;
     }

     return (
          <div className="">
               <h2 className="text-4xl text-slate-300 mb-2">Breeding - beta</h2>
               <Calculator1 data={data[0]} />
          </div>
     );
}
