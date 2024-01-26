import { ObjectId } from "mongodb";
import { client } from "./connector";

export const getEntry = async (
  database: string,
  collectionName: string,
  docId: string
) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection.findOne({
    _id: new ObjectId(docId),
  });
  return result;
};

export const updateEntry = async (
  database: string,
  collectionName: string,
  docID: string,
  updatedData: any
) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    {
      _id: new ObjectId(docID),
    },
    {
      $set: updatedData,
    }
  );
  return result;
};
