import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import { IPaginationOptions } from "../../interfaces/paginateOptions";
import { adminSearchableFields } from "./admin.constant";
import prisma from "../../../shared/prisma";

const getAllAdminFromDB = async (
  params: any,
  paginateOptions: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginateOptions);

  const andCondition: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchableFields.map((field) => ({
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

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
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

  const total = await prisma.admin.count({
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

export const AdminService = {
  getAllAdminFromDB,
};
