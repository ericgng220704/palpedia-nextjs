import Link from "next/link";
import getFireBaseImage from "@/lib/getFireBaseImage";
import { useEffect, useState } from "react";
import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";

export default function Post({ deleteMode, post, onDelete }) {
     // const [imageURL, setImageURL] = useState("");
     // const [imageName, setImageName] = useState("");

     // useEffect(() => {
     //      setImageName(`${post.image}`);
     // }, [post]);

     // useEffect(() => {
     //      async function fetchImage() {
     //           if (imageName) {
     //                const url = await getFireBaseImage(imageName, "blogs");
     //                setImageURL(url);
     //           }
     //      }

     //      if (imageName) {
     //           fetchImage();
     //      }
     // }, [imageName]);

     async function handleDelete() {
          const response = await fetch(`/api/prisma/deletePost`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ post: post }),
          });

          if (response.ok) {
               alert("delete roi");
               onDelete(post.id);
          } else {
               console.error("Failed to delete post");
          }
     }

     const dateObject = new Date(post.createdAt);
     const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          // hour: "2-digit",
          // minute: "2-digit",
          // second: "2-digit",
     };

     const formattedDate = dateObject
          .toLocaleDateString("en-US", options)
          .replace(",", "");

     return (
          <li>
               <Link
                    href={`${deleteMode ? "#" : `/posts/${post.id}`}`}
                    className={`post ${deleteMode ? "relative" : null}`}
               >
                    <div className="post bg-zinc-900 p-6 rounded-lg flex flex-col justify-between box-border gap-4 text-zinc-400 text-3xl">
                         <div className="flex justify-center items-center flex-grow">
                              <Image
                                   src={post.image}
                                   height={850}
                                   width={600}
                              />
                         </div>
                         <div className="mb-4">
                              <h3 className="text-4xl text-white">
                                   {post.title}
                              </h3>
                         </div>
                         <div>
                              <ul className="flex gap-3 mb-4">
                                   {post.hashtags.map((hashtag) => {
                                        return (
                                             <li key={hashtag.hashtagId}>
                                                  <span className="text text-indigo-200">
                                                       #{hashtag.hashtag.name}
                                                  </span>
                                             </li>
                                        );
                                   })}
                              </ul>
                         </div>
                         <div className="flex justify-between items-center">
                              <div className="flex gap-4 items-center">
                                   <Image
                                        className="rounded-full"
                                        src={post.author.image}
                                        height={30}
                                        width={30}
                                   />
                                   <p>{post.author.name}</p>
                              </div>
                              <p>{formattedDate}</p>
                         </div>
                    </div>
                    {deleteMode ? (
                         <button
                              onClick={handleDelete}
                              className="overlay transition-all absolute top-0 left-0 h-full w-full bg-white opacity-0 flex justify-center items-center"
                         >
                              <VscChromeClose className="text-red-400 h-1/2 w-1/2" />
                         </button>
                    ) : null}
               </Link>
          </li>
     );
}
