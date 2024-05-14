import clientPromise from "@/lib/mongodb";

export default async function getPaldex(req, res) {
     const { type } = req.body;
     try {
          const client = clientPromise;
          const db = client.db(process.env.MONGODB_DB);
          const data = await db
               .collection("paldex")
               .find({ "types.name": type })
               .toArray();
          res.status(200).json(data);
     } catch (e) {
          res.status(500).json({ error: e.message });
     }
}
