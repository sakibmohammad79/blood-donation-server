import { ReviewStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import app from "../../../app";

const createGalleryInotDB = async (payload: any) => {
  
  const result = await prisma.gallery.create({
    data: payload,
  });
  return result;
};

const getAllGalleryFromDB = async () => {
  const result = await prisma.gallery.findMany({});
  return result;
};



export const GallerlyService = {
  createGalleryInotDB,
  getAllGalleryFromDB
};
