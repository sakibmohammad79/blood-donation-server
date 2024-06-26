import prisma from "../../../shared/prisma";

const createReviewInotDB = async (req: any) => {
  const { user } = req;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
    },
  });

  const donorData = await prisma.donor.findFirstOrThrow({
    where: {
      email: userData.email,
    },
  });

  const reviewData = req.body;
  reviewData.name = donorData.name;
  reviewData.donorId = donorData.id;
  reviewData.photo =
    donorData.photo ||
    "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg";
  reviewData.address = donorData.location;

  const result = await prisma.review.create({
    data: reviewData,
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
