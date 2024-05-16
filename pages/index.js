import ImageSlider from "@/components/home/image-slider";
import HomeItemList from "@/components/home/item-list";
import HomePalList from "@/components/home/pal-list";
import Link from "next/link";

export default function HomePage() {
     const slides = [
          {
               image: "https://firebasestorage.googleapis.com/v0/b/palpedia-nextjs.appspot.com/o/imageSlider%2Fhome_1.jpg?alt=media&token=54ba259b-7a50-45b0-9dbd-8c73c2c34133",
          },
          {
               image: "https://firebasestorage.googleapis.com/v0/b/palpedia-nextjs.appspot.com/o/imageSlider%2Fhome_2.png?alt=media&token=b6d93362-36bc-4bbe-9219-bccc95fcaa9a",
          },
          {
               image: "https://firebasestorage.googleapis.com/v0/b/palpedia-nextjs.appspot.com/o/imageSlider%2Fhome_3.png?alt=media&token=8b80c8f6-68c6-42fb-a24b-42e5a6aed756",
          },
          {
               image: "https://firebasestorage.googleapis.com/v0/b/palpedia-nextjs.appspot.com/o/imageSlider%2Fhome_4.png?alt=media&token=91b92ce5-1886-46d0-9413-7748c35302b3",
          },
          {
               image: "https://firebasestorage.googleapis.com/v0/b/palpedia-nextjs.appspot.com/o/imageSlider%2Fhome_5.png?alt=media&token=ebe8ce1d-5205-4545-8843-4421f18c56d0",
          },
          {
               image: "https://firebasestorage.googleapis.com/v0/b/palpedia-nextjs.appspot.com/o/imageSlider%2Fhome_6.png?alt=media&token=065d7942-478e-412a-ae48-9384232881b0",
          },
     ];

     return (
          <div className="py-8">
               <div className="flex flex-col gap-4 justify-center items-center w-full text-zinc-400 text-3xl font-medium">
                    <div className="palpedia text-center my-8 flex flex-col gap-4 text-4xl">
                         <h1 className="text-6xl font-bold text-indigo-300">
                              PALPEDIA
                         </h1>
                         <p className="palpedia-p">
                              Better Insights, Bolder Adventures: PalPedia, Your
                              Pal World Companion
                         </p>
                    </div>
                    <div className="image-slider">
                         <ImageSlider slides={slides} />
                    </div>
                    <div className="palworld border border-black-200 p-4 w-full rounded-lg bg-black-100 mb-4 text-center flex flex-col justify-center items-center gap-3 text-2xl">
                         <p>
                              <span className="text-indigo-500">Palworld</span>{" "}
                              is an action-adventure{" "}
                              <span className="text-indigo-500">
                                   survival game
                              </span>{" "}
                              by developer{" "}
                              <span className="text-indigo-500">
                                   Pocket Pair
                              </span>
                              . The game is set in an{" "}
                              <span className="text-indigo-500">
                                   open world
                              </span>{" "}
                              populated with{" "}
                              <span className="text-indigo-500">
                                   {" "}
                                   animal-like creatures
                              </span>{" "}
                              known as
                              <span className="text-indigo-500">Pals</span>. The
                              players can{" "}
                              <span className="text-indigo-500">
                                   battle and capture
                              </span>{" "}
                              Pals in order to use them for base building,
                              traversal, and combat.
                         </p>

                         <p>
                              Dive into Palworld with{" "}
                              <span className="text-indigo-500">Paldex </span>{" "}
                              by your side and explore, survive, and thrive in
                              this vibrant and challenging environment.
                         </p>
                    </div>

                    <div className="home-list grid grid-cols-2 gap-4 my-12">
                         <div className="flex flex-col gap-4 bg-zinc-900 py-8 px-6 rounded-2xl">
                              <h2 className="text text-3xl text-zinc-300 font-semibold">
                                   PALWORLD PAL LIST
                              </h2>
                              <p className="h-28 viewfullP">
                                   Browse all Pals currently in Palworld. Find
                                   detailed information about each pal,
                                   including type counters, skills and item
                                   drops.
                              </p>
                              <HomePalList />
                              <div className="mt-8 flex justify-center items-center">
                                   <Link
                                        className="home-buttons py-4 px-6 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg w-1/2 flex justify-center items-center"
                                        href="/paldex"
                                   >
                                        View the full Paldeck
                                   </Link>
                              </div>
                         </div>
                         <div className="flex flex-col gap-4 bg-zinc-900 py-8 px-6 rounded-2xl">
                              <h2 className="text text-3xl text-zinc-300 font-semibold">
                                   Palworld Item List
                              </h2>
                              <p className="h-28 viewfullP">
                                   Browse all items currently in Palworld. Find
                                   crafting recipes and use our calculators to
                                   find the resources required for multiple
                                   items.
                              </p>
                              <HomeItemList />
                              <div className="mt-8 flex justify-center items-center">
                                   <Link
                                        className="home-buttons py-4 px-6 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg w-1/2 flex justify-center items-center"
                                        href="/items"
                                   >
                                        View the full Item List
                                   </Link>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
