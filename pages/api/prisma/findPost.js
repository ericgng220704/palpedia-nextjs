import prisma from "@/lib/prisma";

export default async function handler(req, res) {
     if (req.method === "POST") {
          const { postId } = req.body;

          try {
               const posts = await prisma.post.findUnique({
                    where: {
                         id: parseInt(postId, 10),
                    },
                    include: {
                         author: true,
                         hashtags: {
                              include: {
                                   hashtag: true,
                              },
                         },
                    },
               });
               res.status(200).json(posts);
          } catch (error) {
               res.status(500).json({ error: error.message });
          }
     }
}
