import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DetailPal from "@/components/detailPal/detail-pal";
import PalSpawnMap from "@/components/detailPal/map";
import Drops from "@/components/detailPal/drops";
import Counters from "@/components/detailPal/counters";

export default function DetailPalPage() {
     const router = useRouter();
     const { palId } = router.query;
     const [pal, setPal] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          if (router.isReady) {
               async function findPal() {
                    try {
                         setIsLoading(true);
                         console.log(palId);
                         const response = await fetch(`/api/findPal`, {
                              method: "POST",
                              headers: {
                                   "Content-type": "application/json",
                              },
                              body: JSON.stringify({ palId: palId }),
                         });
                         const data = await response.json();

                         setPal(data[0]);
                    } catch (e) {
                         throw new Error("Failed to fetch!");
                    } finally {
                         setIsLoading(false);
                    }
               }

               findPal();
          }
     }, [router.isReady, router.query, palId]);

     if (isLoading) {
          return <p>Loading...</p>;
     }
     return (
          <div className="detailPalPage">
               <div>
                    <DetailPal pal={pal} />
               </div>

               <div className="py-14 flex flex-col gap-8">
                    <div className="map">
                         <PalSpawnMap pal={pal} />
                    </div>

                    <div className="drops">
                         <Drops pal={pal} />
                    </div>

                    <div className="counters">
                         <Counters pal={pal} />
                    </div>
               </div>
          </div>
     );
}
