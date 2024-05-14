import Image from "next/image";

export default function TypeFilters({ setSelectedTypeFilter }) {
     const types = [
          {
               name: "water",
               image: "/images/elements/water.png",
          },
          {
               name: "fire",
               image: "/images/elements/fire.png",
          },
          {
               name: "ice",
               image: "/images/elements/ice.png",
          },
          {
               name: "grass",
               image: "/images/elements/grass.png",
          },
          {
               name: "neutral",
               image: "/images/elements/neutral.png",
          },
          {
               name: "dark",
               image: "/images/elements/dark.png",
          },
          {
               name: "electric",
               image: "/images/elements/electric.png",
          },
          {
               name: "dragon",
               image: "/images/elements/dragon.png",
          },
          {
               name: "ground",
               image: "/images/elements/ground.png",
          },
     ];

     return (
          <ul className="typeFilters h-full flex justify-end items-center">
               <li key="all" className="all">
                    <button
                         key="all"
                         onClick={() => setSelectedTypeFilter("all")}
                    >
                         all
                    </button>
               </li>
               {types.map((type) => {
                    return (
                         <li
                              key={type.name}
                              className="p-2 flex justify-center items-center bg-gray-800 h-14 w-14 rounded-lg"
                         >
                              <button
                                   key={type.name}
                                   onClick={() =>
                                        setSelectedTypeFilter(type.name)
                                   }
                              >
                                   <Image
                                        src={type.image}
                                        height={30}
                                        width={30}
                                   />
                              </button>
                         </li>
                    );
               })}
          </ul>
     );
}
