import { Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/paginateOptions";
import { paginationHelper } from "../../../helper/paginationHelper";
import { donorSearchableFields } from "./donor.constant";
import prisma from "../../../shared/prisma";

const getAllDonorFromDB = async (
  params: any,
  paginateOptions: IPaginationOptions
) => {
  const { searchTerm, specialties, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } =
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
        : { createdAt: "desc" },
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

export const DonorService = {
  getAllDonorFromDB,
};
