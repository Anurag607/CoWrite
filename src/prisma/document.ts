import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a document
const CreateDocument = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  try {
    const document = await prisma.document.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        desc: req.body.desc,
        descImg: req.body.descImg,
      },
    });
    res.status(201).json(document);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

// Get all documents
const GetDocuments = async ({ req, res }: { req: Request; res: Response }) => {
  try {
    const documents = await prisma.document.findMany({});
    res.status(201).json(documents);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

// Get a document
const GetDocument = async ({ req, res }: { req: Request; res: Response }) => {
  try {
    const document = await prisma.document.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json(document);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

// Update a document
const UpdateDocument = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  try {
    const document = await prisma.document.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });
    res.status(201).json(document);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

// Delete a document
const DeleteDocument = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  try {
    const document = await prisma.document.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json(document);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export {
  CreateDocument,
  GetDocuments,
  GetDocument,
  UpdateDocument,
  DeleteDocument,
};
