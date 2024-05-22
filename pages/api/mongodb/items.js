import clientPromise from "@/lib/mongodb";

export default async function getItems(req, res) {
     try {
          const client = clientPromise;
          const db = client.db(process.env.MONGODB_DB);
          const data = await db
               .collection("items")
               .find()
               .sort({ _id: 1 })
               .toArray();
          res.status(200).json(data);
     } catch (e) {
          res.status(500).json({ error: e.message });
     }
}
