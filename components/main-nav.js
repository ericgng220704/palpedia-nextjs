import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function MainNav() {
     const { data: session, status } = useSession();
     if (status === "loading") {
          return <div>Loading...</div>;
     }
     return (
          <>
               <nav className="flex justify-between items-center  h-20 text-slate-400">
                    <div className=" text-yellow-500 font-semibold text-4xl">
                         <Link href="/">Palpedia</Link>
                    </div>
                    <ul className="flex gap-10">
                         <li className="md:px-4 md:py-2 hover:text-yellow-400">
                              <Link href="/">Home</Link>
                         </li>

                         <li className="md:px-4 md:py-2 hover:text-yellow-400">
                              <Link href="/paldex">PalDex</Link>
                         </li>

                         <li className="md:px-4 md:py-2 hover:text-yellow-400">
                              <Link href="/items">Items</Link>
                         </li>
                         <li className="md:px-4 md:py-2 hover:text-yellow-400">
                              <Link href="/blog">Blog</Link>
                         </li>
                    </ul>
                    <div>
                         {session ? (
                              <div className="flex gap-4 items-center">
                                   <div className="flex gap-4">
                                        <Image
                                             className="rounded-full"
                                             src={session.user.image}
                                             height={30}
                                             width={30}
                                        />
                                        <p>{session.user.name}</p>
                                   </div>
                                   <button onClick={signOut}>Sign out</button>
                              </div>
                         ) : (
                              <button onClick={() => signIn("google")}>
                                   Sign In
                              </button>
                         )}
                    </div>
               </nav>
          </>
     );
}
