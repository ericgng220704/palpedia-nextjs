import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/helper_functions/helper";
import ListCounterPals from "./list-counters-pals";

export default function Counters({ pal }) {
     const [counter, setCounter] = useState("");
     const [isLoading, setIsLoading] = useState(true);
     const palElement = pal.types[0].name;

     useEffect(() => {
          async function fetchCounter() {
               try {
                    setIsLoading(true);
                    const response = await fetch(`/api/findCounterElement`, {
                         method: "POST",
                         headers: {
                              "Content-type": "application/json",
                         },
                         body: JSON.stringify({ palElement: palElement }),
                    });
                    const data = await response.json();

                    setCounter(data[0]);
               } catch (e) {
                    throw new Error("Failed to fetch!");
               } finally {
                    setIsLoading(false);
               }
          }

          fetchCounter();
     }, [pal, palElement]);

     if (isLoading) {
          return <p>Loading...</p>;
     }

     return (
          <div>
               <div>
                    <h2>{pal.name} Counters</h2>
                    <p>
                         {pal.name} is a{" "}
                         {capitalizeFirstLetter(counter.primaryElement)} Pal.{" "}
                         {capitalizeFirstLetter(counter.primaryElement)} Pals
                         are weak to {capitalizeFirstLetter(counter.counter)}{" "}
                         Pals.
                    </p>
               </div>

               <div className="related-pals">
                    <ListCounterPals palElement={palElement} />
               </div>
          </div>
     );
}
