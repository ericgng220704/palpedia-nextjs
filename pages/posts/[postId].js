import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PostImage from "@/components/blog/postImage";
import { VscChevronLeft } from "react-icons/vsc";

export default function DetailPostPage() {
     const router = useRouter();
     const { postId } = router.query;
     const [post, setPost] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          if (router.isReady) {
               async function findPost() {
                    try {
                         setIsLoading(true);
                         const response = await fetch(`/api/prisma/findPost`, {
                              method: "POST",
                              headers: {
                                   "Content-type": "application/json",
                              },
                              body: JSON.stringify({ postId: postId }),
                         });
                         const data = await response.json();

                         setPost(data);
                    } catch (e) {
                         throw new Error("Failed to fetch!");
                    } finally {
                         setIsLoading(false);
                    }
               }

               findPost();
          }
     }, [router.isReady, router.query, postId]);

     if (isLoading) {
          return <p>Loading...</p>;
     }

     const dateObject = new Date(post.createdAt);
     const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
     };

     const formattedDate = dateObject
          .toLocaleDateString("en-US", options)
          .replace(",", "");

     const chunks = post.content.split(/\n\s*\n/);
     console.log(chunks);
     return (
          <div className="detailPostPage text-zinc-400 font-medium text-3xl flex flex-col gap-8 mt-12 px-52">
               <Link
                    href={`/posts`}
                    className="text-indigo-200 flex items-center gap-4 transition-all hover:gap-6"
               >
                    {" "}
                    <VscChevronLeft />
                    BACK TO ALL
               </Link>
               <p className="text-2xl">{formattedDate}</p>
               <h1 className="text-6xl font-semibold text-white">
                    {post.title}
               </h1>

               <ul className="flex gap-4">
                    {post.hashtags.map((hashtag) => {
                         return (
                              <li
                                   key={hashtag.hashtagId}
                                   className="py-2 px-5 bg-indigo-400 text-white rounded-3xl"
                              >
                                   <span>
                                        #{hashtag.hashtag.name.toUpperCase()}
                                   </span>
                              </li>
                         );
                    })}
               </ul>

               <div className="flex flex-col justify-center gap-8">
                    <Image
                         className="rounded-2xl"
                         src={post.image}
                         height={500}
                         width={800}
                    />

                    <div className="text-zinc-200">
                         {chunks.map((chunk, index) => {
                              return (
                                   <p key={index} className="mb-4">
                                        {chunk}
                                   </p>
                              );
                         })}
                    </div>
               </div>
          </div>
     );
}
