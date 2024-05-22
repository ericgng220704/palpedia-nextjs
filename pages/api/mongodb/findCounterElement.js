import clientPromise from "@/lib/mongodb";

export default async function findCounterElement(req, res) {
     const { palElement } = req.body;
     try {
          const client = clientPromise;
          const db = client.db(process.env.MONGODB_DB);
          const data = await db
               .collection("counters")
               .find({ primaryElement: palElement })
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
