import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export default function MainNav() {
     const { data: session, status } = useSession();
     const [isOpen, setIsOpen] = useState(false);
     const router = useRouter();

     const toggleMenu = () => {
          setIsOpen(!isOpen);
     };

     if (status === "loading") {
          return <div>Loading...</div>;
     }

     return (
          <>
               <nav className="main-nav flex justify-between items-center  h-20 text-zinc-400">
                    <div className="group1">
                         <div className="logo text-indigo-300 font-semibold text-4xl">
                              <Link href="/">Palpedia</Link>
                         </div>
                         <div className="burger-menu" onClick={toggleMenu}>
                              {isOpen ? (
                                   <FaTimes size={30} />
                              ) : (
                                   <FaBars size={30} />
                              )}
                         </div>

                         <ul className="links flex gap-10">
                              <li
                                   className={`md:px-4 md:py-2 hover:text-indigo-100 ${
                                        router.pathname === "/"
                                             ? "text-indigo-300"
                                             : null
                                   }`}
                              >
                                   <Link href="/">Home</Link>
                              </li>

                              <li
                                   className={`md:px-4 md:py-2 hover:text-indigo-100 ${
                                        router.pathname.includes("/paldex")
                                             ? "text-indigo-300"
                                             : null
                                   }`}
                              >
                                   <Link href="/paldex">PalDex</Link>
                              </li>

                              <li
                                   className={`md:px-4 md:py-2 hover:text-indigo-100 ${
                                        router.pathname.includes("/items")
                                             ? "text-indigo-300"
                                             : null
                                   }`}
                              >
                                   <Link href="/items">Items</Link>
                              </li>

                              <li
                                   className={`md:px-4 md:py-2 hover:text-indigo-100 ${
                                        router.pathname.includes(
                                             "/passive-skills"
                                        )
                                             ? "text-indigo-300"
                                             : null
                                   }`}
                              >
                                   <Link href="/passive-skills">
                                        Passive Skills
                                   </Link>
                              </li>

                              <li
                                   className={`md:px-4 md:py-2 hover:text-indigo-100 ${
                                        router.pathname.includes("/breeding")
                                             ? "text-indigo-300"
                                             : null
                                   }`}
                              >
                                   <Link href="/breeding">Breeding</Link>
                              </li>

                              <li
                                   className={`md:px-4 md:py-2 hover:text-indigo-100 ${
                                        router.pathname.includes("/posts")
                                             ? "text-indigo-300"
                                             : null
                                   }`}
                              >
                                   <Link href="/posts">Blog</Link>
                              </li>
                         </ul>
                    </div>
                    <div className="profile">
                         {session ? (
                              <div className="flex gap-4 items-center">
                                   <Image
                                        className="rounded-full"
                                        src={session.user.image}
                                        height={30}
                                        width={30}
                                   />
                                   <div className="flex gap-4">
                                        <p>{session.user.name}</p>
                                        <button onClick={signOut}>
                                             Sign out
                                        </button>
                                   </div>
                              </div>
                         ) : (
                              <button
                                   onClick={() => {
                                        signIn("google");
                                   }}
                              >
                                   Sign In
                              </button>
                         )}
                    </div>
               </nav>

               {isOpen ? (
                    <ul className="links--responsive flex flex-col text-zinc-400">
                         <li className=" hover:text-indigo-100 py-8 px-4 flex justify-center items-center text-3xl bg-zinc-900 border-y border-zinc-600">
                              <Link href="/">Home</Link>
                         </li>

                         <li className=" hover:text-indigo-100 py-8 px-4 flex justify-center items-center text-3xl bg-zinc-900 border-b border-zinc-600">
                              <Link href="/paldex">PalDex</Link>
                         </li>

                         <li className=" hover:text-indigo-100 py-8 px-4 flex justify-center items-center text-3xl bg-zinc-900 border-b border-zinc-600">
                              <Link href="/items">Items</Link>
                         </li>

                         <li className=" hover:text-indigo-100 py-8 px-4 flex justify-center items-center text-3xl bg-zinc-900 border-b border-zinc-600">
                              <Link href="/posts">Blogs</Link>
                         </li>
                    </ul>
               ) : null}
          </>
     );
}
