import { useEffect, useState } from "react";
import Item from "./item";

export default function ItemList({ searchTerm }) {
     const [items, setItems] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          async function fetchItems() {
               try {
                    setIsLoading(true);
                    const response = await fetch("/api/items");

                    if (!response.ok) {
                         throw new Error(`Status: ${response.status}`);
                    }

                    const data = await response.json();
                    setItems(data);
               } catch (e) {
                    throw new Error("Failed to fetch");
               } finally {
                    setIsLoading(false);
               }
          }

          fetchItems();
     }, []);

     if (isLoading) {
          return <p>Loading....</p>;
     }

     const filteredItems = items.filter((item) => {
          const matchesSearch = item.name
               .toLowerCase()
               .includes(searchTerm.toLowerCase());
          return matchesSearch;
     });

     return (
          <div className="item-list  grid grid-cols-3 gap-12">
               {filteredItems.map((item) => {
                    return <Item key={item.key} item={item} />;
               })}
          </div>
     );
}
