import { Donor, Prisma, UserStatus } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/paginateOptions";
import { paginationHelper } from "../../../helper/paginationHelper";
import { donorSearchableFields } from "./donor.constant";
import prisma from "../../../shared/prisma";

const getAllDonorFromDB = async (
  params: any,
  paginateOptions: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginateOptions);

  const andCondition: Prisma.DonorWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: donorSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
          mode: "insensitive",
        },
      })),
    });
  }

  andCondition.push({
    isDeleted: false,
  });

  const whereCondition: Prisma.DonorWhereInput = { AND: andCondition };
  const result = await prisma.donor.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginateOptions.sortBy && paginateOptions.sortOrder
        ? {
            [paginateOptions.sortBy as string]: paginateOptions.sortOrder,
          }
        : { createdAt: "asc" },
  });

  const total = await prisma.donor.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDonorFromDB = async (id: string) => {
  const result = await prisma.donor.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const donorDeleteIntoDB = async (id: string) => {
  await prisma.donor.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const donorDeleteData = await transactionClient.donor.delete({
      where: {
        id,
      },
    });
    await transactionClient.user.delete({
      where: {
        email: donorDeleteData.email,
      },
    });
    return donorDeleteData;
  });
  return result;
};

const donorSoftDeleteIntoDB = async (id: string) => {
  await prisma.donor.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const donorDeleteData = await transactionClient.donor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: donorDeleteData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return donorDeleteData;
  });
  return result;
};

const updateDonorIntoDB = async (
  id: string,
  data: Partial<Donor>
): Promise<Donor> => {
  await prisma.donor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.donor.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const DonorService = {
  getAllDonorFromDB,
  getSingleDonorFromDB,
  donorDeleteIntoDB,
  donorSoftDeleteIntoDB,
  updateDonorIntoDB,
};
