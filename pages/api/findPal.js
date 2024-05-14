import clientPromise from "@/lib/mongodb";

export default async function findPal(req, res) {
     const { palId } = req.body;
     try {
          const client = clientPromise;
          const db = client.db(process.env.MONGODB_DB);
          const data = await db
               .collection("paldex")
               .find({ id: +palId })
               .sort({ key: 1 })
               .toArray();
          if (!data) {
               return res
                    .status(404)
                    .json({ message: "No entry found for this slug" });
          }
          res.status(200).json(data);
     } catch (e) {
          res.status(500).json({ error: e.message });
     }
}
