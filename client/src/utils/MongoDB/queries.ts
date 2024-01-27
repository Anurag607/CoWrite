import { client } from "./connector";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const database = process.env.MONGODB_DB;

// function to get all the documents from the collection
export const getAllEntries = async (
  collectionName: string,
  emailId: string
) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection
    .find({
      access: { $in: [emailId] },
    })
    .toArray();
  return result;
};

// function to get a document from the collection
export const getEntry = async (collectionName: string, docId: string) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection.findOne({
    _id: new ObjectId(docId),
  });
  return result;
};

// function to insert a document into the collection
export const insertEntry = async (collectionName: string, data: any) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(data);
  return result;
};

// function to update a document in the collection
export const updateEntry = async (
  collectionName: string,
  docID: string,
  updatedData: any,
  user_emailId: any
) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const document = await collection.findOne({
    _id: new ObjectId(docID),
  });
  if (!document) return { status: 404, message: "Not Found" };
  if (document.hasOwnProperty("access")) {
    if (!document.access.includes(user_emailId))
      return { status: 401, message: "Unauthorized" };
  }
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

// function to delete a document from the collection
export const deleteEntry = async (collectionName: string, docID: string) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({
    _id: new ObjectId(docID),
  });
  return result;
};

// function to login user
export const loginUser = async (userData: any) => {
  const db = client.db(database);
  const collection = db.collection("users");
  const user = await collection.findOne({
    email: userData.email,
  });

  if (!user) return null;
  const validate = await bcrypt.compare(userData.password, user!.password);
  if (!validate) return -1;

  return user;
};

// function to register user
export const registerUser = async (userData: any) => {
  const db = client.db(database);
  const collection = db.collection("users");

  const user = await collection.findOne({ email: userData.email });
  if (user) return null;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = await collection.insertOne({
    ...userData,
    password: hashedPassword,
  });
  const newUserId = newUser.insertedId;

  const JWTToken = jwt.sign(
    { id: newUserId, email: userData.email },
    process.env.JWT_SECRET || "JWTSecret",
    { expiresIn: "3h" }
  );

  await collection.updateOne(
    { _id: new ObjectId(newUserId) },
    { $set: { token: JWTToken } }
  );

  const updatedUser = await collection.findOne({ _id: newUserId });

  return updatedUser;
};

// function for forgot password
export const forgotPassword = async (userData: any) => {
  const db = client.db(database);
  const collection = db.collection("users");

  const user = await collection.findOne({ email: userData.email });
  if (!user) return null;

  console.log(user);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.new_password, salt);

  await collection.updateOne(
    { email: user.email },
    { $set: { password: hashedPassword } }
  );

  return user;
};
