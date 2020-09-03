import { connectDB } from "./connect-db";

export const addComment = async (comment) => {
  let db = await connectDB();
  let collection = db.collection("comments");
  await collection.insertOne(comment);
};
