import prisma from "@/lib/prisma";

export default async function handler(req, res) {
     if (req.method === "POST") {
          try {
               const { email } = req.body;

               const post = await prisma.user.findUnique({
                    where: {
                         email: email,
                    },
               });

               if (post) {
                    res.status(200).json(post);
               } else {
                    res.status(200).json(null);
               }
          } catch (error) {
               console.error(error);
               res.status(500).json({ error: "Internal server error" });
          }
     } else {
          res.status(405).json({ error: "Method not allowed" });
     }
}
