import prisma from "@/lib/prisma";

export default async function handler(req, res) {
     if (req.method === "DELETE") {
          const { post } = req.body;

          try {
               await prisma.postHashtag.deleteMany({
                    where: {
                         postId: post.id,
                    },
               });

               await prisma.post.delete({
                    where: { id: post.id },
               });

               res.status(200).json({ message: "Post deleted successfully" });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ error: "Failed to delete post" });
          }
     } else {
          res.status(405).json({ error: "Method not allowed" });
     }
}
