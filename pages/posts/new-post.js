import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import UploadImage from "@/components/blog/uploadImage";

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
     const hashtags = await prisma.hashtag.findMany();
     const authors = await prisma.user.findMany();
     const session = await getSession(context);

     const serializedAuthors = authors.map((author) => ({
          ...author,
          createdAt: author.createdAt.toISOString(),
     }));

     return {
          props: {
               hashtags,
               authors: serializedAuthors,
               session,
          },
     };
}

export default function NewPostPage({ hashtags, authors, session }) {
     const [selectedHashtags, setSelectedHashtags] = useState([]);
     const [author, setAuthor] = useState(null);
     const router = useRouter();
     const [imageUrl, setImageUrl] = useState("");

     useEffect(() => {
          if (session) {
               const currentAuthor = authors.find(
                    (author) => author.email === session.user.email
               );
               setAuthor(currentAuthor);
          }
     }, [session, authors]);

     const handleSubmit = async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const data = Object.fromEntries(formData.entries());
          data.hashtags = selectedHashtags;

          const response = await fetch("/api/prisma/create-post", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ data, authorId: author.id, imageUrl }),
          });

          if (response.ok) {
               alert("Post created successfully!");
               router.push("/posts");
          } else {
               alert("Failed to create post.");
          }
     };

     const handleHashtagChange = (event) => {
          const value = Array.from(
               event.target.selectedOptions,
               (option) => option.value
          );
          setSelectedHashtags(value);
     };

     const handleUpload = (url) => {
          setImageUrl(url);
          console.log(url);
     };

     return (
          <div className="w-3/4 mx-auto p-4 text-zinc-400 font-semibold 4xl newPostPage">
               <h1 className="text-5xl font-bold mb-4 text-indigo-300">
                    Create a New Post
               </h1>
               <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                         <label htmlFor="title">Title</label>
                         <input
                              type="text"
                              name="title"
                              id="title"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-zinc-900 text-white font-medium"
                              required
                         />
                    </div>
                    <div>
                         <label htmlFor="content">Content</label>
                         <textarea
                              name="content"
                              id="content"
                              rows="14"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-zinc-900 text-white text-2xl font-medium"
                              required
                         ></textarea>
                    </div>
                    <div>
                         <label
                              htmlFor="authorId"
                              className="flex gap-8 items-center"
                         >
                              <span>Author:</span>{" "}
                              {author ? (
                                   <div className="flex gap-4 items-center">
                                        <Image
                                             className="rounded-full"
                                             src={author.image}
                                             height={30}
                                             width={30}
                                        />
                                        <h1>{author.name || author.email}</h1>
                                   </div>
                              ) : (
                                   <p>Loading...</p>
                              )}
                         </label>
                    </div>
                    <div className="grid grid-cols-2 gap-8 group3">
                         <div>
                              <label htmlFor="hashtags">Hashtags</label>
                              <select
                                   name="hashtags"
                                   id="hashtags"
                                   multiple
                                   onChange={handleHashtagChange}
                                   className="mt-1 w-full h-56 p-2 border border-gray-300 rounded-md bg-zinc-900"
                              >
                                   {hashtags.map((hashtag) => (
                                        <option
                                             key={hashtag.id}
                                             value={hashtag.id}
                                        >
                                             {hashtag.name}
                                        </option>
                                   ))}
                              </select>
                         </div>

                         <div className="flex flex-col gap-4">
                              <label htmlFor="imageUpload">Upload Image</label>
                              <UploadImage
                                   onUpload={handleUpload}
                                   name="imageUpload"
                              />
                              {imageUrl && (
                                   <div className="flex flex-col justify-center">
                                        <Image
                                             className="rounded-2xl self-center"
                                             src={imageUrl}
                                             alt="Uploaded"
                                             height={350}
                                             width={500}
                                        />
                                   </div>
                              )}
                         </div>
                    </div>
                    <div>
                         <button
                              type="submit"
                              className="mt-4 bg-indigo-500 text-white py-4 px-8 rounded-2xl"
                         >
                              Create Post
                         </button>
                    </div>
               </form>
          </div>
     );
}
