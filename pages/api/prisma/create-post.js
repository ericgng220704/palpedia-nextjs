import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
     if (req.method === "POST") {
          const { data, authorId, imageUrl } = req.body;
          try {
               const post = await prisma.post.create({
                    data: {
                         title: data.title,
                         content: data.content,
                         authorId: parseInt(authorId, 10),
                         image: imageUrl,
                    },
               });

               const hashtagPromises = data.hashtags.map((hashtagId) =>
                    prisma.postHashtag.create({
                         data: {
                              postId: post.id,
                              hashtagId: parseInt(hashtagId, 10),
                         },
                    })
               );
               await Promise.all(hashtagPromises);

               res.status(201).json(post);
          } catch (error) {
               res.status(500).json({ error: "Failed to create post." });
          }
     } else {
          res.status(405).json({ error: "Method not allowed" });
     }
}
