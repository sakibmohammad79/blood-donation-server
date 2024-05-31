import prisma from "../../../shared/prisma";

const createReviewInotDB = async (payload: any) => {
  const result = await prisma.review.create({
    data: payload,
  });
  return result;
};

const getAllReviewFromDB = async () => {
  const result = await prisma.review.findMany({});
  return result;
};

export const ReviewService = {
  createReviewInotDB,
  getAllReviewFromDB,
};
