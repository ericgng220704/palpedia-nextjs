import { useSession } from "next-auth/react";
import { createUser } from "@/lib/helper_functions/helper";
import { useEffect, useState } from "react";
import Link from "next/link";
import Post from "@/components/blog/post";
import prisma from "@/lib/prisma";

export default function BlogPage({ hashtags }) {
     const { data: session, status } = useSession();
     const [isNewUser, setIsNewUser] = useState();
     const [allPosts, setAllPosts] = useState([]);
     const [isLoading, setIsLoading] = useState();
     const [selectedFilter, setSelectedFilter] = useState(null);
     const [deleteMode, SetDeleteMode] = useState(false);

     useEffect(() => {
          if (session && status === "authenticated") {
               async function checkNewUser() {
                    const response = await fetch("/api/prisma/findUser", {
                         method: "POST",
                         headers: {
                              "Content-type": "application/json",
                         },
                         body: JSON.stringify({
                              email: session.user.email,
                         }),
                    });

                    const data = await response.json();
                    if (data) {
                         setIsNewUser(false);
                    } else {
                         setIsNewUser(true);
                    }
               }

               async function retrieveAllPosts() {
                    try {
                         setIsLoading(true);
                         const response = await fetch("/api/prisma/posts", {
                              method: "GET",
                         });

                         const data = await response.json();

                         if (data) {
                              setAllPosts(data);
                         }
                    } catch (e) {
                         throw new Error("Failed to fetch all!");
                    } finally {
                         setIsLoading(false);
                    }
               }

               checkNewUser();
               retrieveAllPosts();

               if (isNewUser) {
                    createUser(session, status);
               }
          }
     }, [session]);

     function handlePostDelete(postId) {
          setAllPosts((prevPosts) =>
               prevPosts.filter((post) => post.id !== postId)
          );
     }

     function handleSelectedHashtag(hashtagName) {
          setSelectedFilter((prevHashtag) =>
               prevHashtag === hashtagName ? null : hashtagName
          );
     }

     const filteredPosts = selectedFilter
          ? allPosts.filter((post) => {
                 let match = false;
                 post.hashtags.map((hashtag) => {
                      if (hashtag.hashtag.name === selectedFilter) {
                           match = true;
                           return match;
                      }
                 });

                 return match;
            })
          : allPosts;

     // const isAdmin =
     //      session.user.email === "giahaonguyen2207@gmail.com" ||
     //      session.user.email === "thu01112004@gmail.com";

     return (
          <div className={`text-3xl text-zinc-400 font-medium postPage`}>
               <h1 className="text-5xl font-bold text-indigo-200 mb-8">
                    Palpeida community
               </h1>

               {session ? (
                    <div>
                         <h2 className="text-3xl font-semibold text-white ">
                              {isNewUser ? "Hi, " : "Welcome back, "}
                              {session.user.name} !
                         </h2>

                         <div className="blog-main py-10">
                              <div className="blog-page-left flex flex-col gap-6">
                                   <div className="chosen-category flex justify-between border-b-2 border-zinc-800 py-4">
                                        <h2 className="flex gap-2 h-8">
                                             <span className="text-4xl">
                                                  {selectedFilter === null ? (
                                                       <p>ALL</p>
                                                  ) : (
                                                       <p>
                                                            #
                                                            {selectedFilter.toUpperCase()}
                                                       </p>
                                                  )}
                                             </span>{" "}
                                             <span className="text-2xl text-indigo-200">
                                                  {filteredPosts.length}
                                             </span>
                                        </h2>
                                        {session.user.email ===
                                             "giahaonguyen2207@gmail.com" ||
                                        session.user.email ===
                                             "thu01112004@gmail.com" ? (
                                             <div className="flex gap-4 admin-buttons">
                                                  <button
                                                       onClick={() =>
                                                            SetDeleteMode(
                                                                 (prevState) =>
                                                                      prevState
                                                                           ? false
                                                                           : true
                                                            )
                                                       }
                                                       className={` py-2 px-8 text-white rounded-3xl transition-all outline outline-1 hover:text-red-400 ${
                                                            deleteMode === true
                                                                 ? "bg-red-500 text-white"
                                                                 : null
                                                       }`}
                                                  >
                                                       Delete mode
                                                  </button>
                                                  <Link
                                                       href="/posts/new-post"
                                                       className="py-2 px-8 text-white rounded-3xl transition-all outline outline-1 hover:text-indigo-400"
                                                  >
                                                       New Post
                                                  </Link>
                                             </div>
                                        ) : null}
                                   </div>

                                   <ul className="grid grid-cols-2 gap-4">
                                        {isLoading ? <p>Loading...</p> : null}
                                        {!isLoading &&
                                             filteredPosts.map((post) => {
                                                  return (
                                                       <Post
                                                            deleteMode={
                                                                 deleteMode
                                                            }
                                                            post={post}
                                                            onDelete={
                                                                 handlePostDelete
                                                            }
                                                            key={post.id}
                                                       />
                                                  );
                                             })}
                                   </ul>
                              </div>
                              <div className="blog-page-right py-6 pl-16">
                                   <div className=" py-8 px-2 flex flex-col gap-12">
                                        <h2 className="text-4xl">
                                             EXPLORE TOPICS
                                        </h2>
                                        <ul className="flex flex-col justify-center gap-4">
                                             {hashtags.map((hashtag) => {
                                                  return (
                                                       <li
                                                            key={hashtag.id}
                                                            className={`py-4 px-8 outline outline-1 outline-zinc-400 ${
                                                                 selectedFilter ===
                                                                 hashtag.name
                                                                      ? "bg-indigo-200 text-zinc-700"
                                                                      : null
                                                            }`}
                                                       >
                                                            <button
                                                                 onClick={() =>
                                                                      handleSelectedHashtag(
                                                                           hashtag.name
                                                                      )
                                                                 }
                                                            >
                                                                 #{hashtag.name}
                                                            </button>
                                                       </li>
                                                  );
                                             })}
                                        </ul>
                                   </div>
                              </div>
                         </div>
                    </div>
               ) : (
                    <h2>Please sign in to continue</h2>
               )}
          </div>
     );
}

export async function getServerSideProps(context) {
     const hashtags = await prisma.hashtag.findMany();
     return {
          props: {
               hashtags,
          },
     };
}
