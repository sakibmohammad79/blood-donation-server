import { Admin, Prisma, UserStatus } from "@prisma/client";
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
    include: {
      user: true,
    },
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

const getSingleAdminFromDB = async (id: string) => {
  const result = await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const adminDeleteIntoDB = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleteData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });
    await transactionClient.user.delete({
      where: {
        email: adminDeleteData.email,
      },
    });
    return adminDeleteData;
  });
  return result;
};

const adminSoftDeleteIntoDB = async (id: string) => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleteData = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeleteData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return adminDeleteData;
  });
  return result;
};

const updateAdminIntoDB = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const adminStatusChagne = async (id: string, query: any) => {
  const { status } = query;

  const adminData = await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: adminData.email,
    },
  });
  let result;
  if (status === UserStatus.ACTIVE) {
    result = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: { status: UserStatus.ACTIVE },
    });
  }
  if (status === UserStatus.BLOCKED) {
    result = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: { status: UserStatus.BLOCKED },
    });
  }
  if (status === UserStatus.DELETED) {
    result = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: { status: UserStatus.DELETED },
    });
  }

  return result;
};

export const AdminService = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  adminDeleteIntoDB,
  adminSoftDeleteIntoDB,
  updateAdminIntoDB,
  adminStatusChagne,
};
