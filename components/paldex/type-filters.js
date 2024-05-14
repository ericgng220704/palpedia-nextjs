import ElementImage from "./elementImage";

export default function TypeFilters({ setSelectedTypeFilter }) {
     const types = [
          {
               name: "water",
               imageName: "water.png",
          },
          {
               name: "fire",
               imageName: "fire.png",
          },
          {
               name: "ice",
               imageName: "ice.png",
          },
          {
               name: "grass",
               imageName: "grass.png",
          },
          {
               name: "neutral",
               imageName: "neutral.png",
          },
          {
               name: "dark",
               imageName: "dark.png",
          },
          {
               name: "electric",
               imageName: "electric.png",
          },
          {
               name: "dragon",
               imageName: "dragon.png",
          },
          {
               name: "ground",
               imageName: "ground.png",
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
                                   <ElementImage
                                        element={type}
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
