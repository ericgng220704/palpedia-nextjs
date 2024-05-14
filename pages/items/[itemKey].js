import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DetailItem from "@/components/detailItem/detail-item";

export default function DetailItemPage() {
     const router = useRouter();
     const { itemKey } = router.query;
     const [item, setItem] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          if (router.isReady) {
               async function findItem() {
                    try {
                         setIsLoading(true);
                         const response = await fetch(`/api/findItem`, {
                              method: "POST",
                              headers: {
                                   "Content-type": "application/json",
                              },
                              body: JSON.stringify({ itemKey: itemKey }),
                         });
                         const data = await response.json();

                         setItem(data[0]);
                    } catch (e) {
                         throw new Error("Failed to fetch!");
                    } finally {
                         setIsLoading(false);
                    }
               }

               findItem();
          }
     }, [router.isReady, router.query, itemKey]);

     if (isLoading) {
          return <p>Loading...</p>;
     }
     return (
          <div>
               <div className="detail-item">
                    <DetailItem item={item} />
               </div>
          </div>
     );
}
