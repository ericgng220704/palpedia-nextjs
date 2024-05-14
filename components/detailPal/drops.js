import Drop from "./drop";

export default function Drops({ pal }) {
     return (
          <div>
               <h2 className="text-3xl text-slate-300 mb-2">
                    {pal.name} Drops
               </h2>
               <ul className="flex flex-col gap-4">
                    {pal.drops.map((drop, index) => {
                         return <Drop drop={drop} key={index} />;
                    })}
               </ul>
          </div>
     );
}
