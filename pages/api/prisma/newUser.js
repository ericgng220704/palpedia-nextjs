import prisma from "@/lib/prisma";

export default async function handler(req, res) {
     if (req.method === "POST") {
          const { email, name, picture } = req.body;
          let role = "USER";
          if (email === "giahaonguyen2207@gmail.com") {
               role = "ADMIN";
          }

          const post = await prisma.user.create({
               data: {
                    email,
                    name,
                    image: picture,
                    role,
               },
          });

          res.status(201).json(post);
     }
}
