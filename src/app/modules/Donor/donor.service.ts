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
  console.log(filterData);
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginateOptions);

  // const andCondition: Prisma.DonorWhereInput[] = [];
  // if (params.searchTerm) {
  //   andCondition.push({
  //     OR: donorSearchableFields.map((field) => ({
  //       [field]: {
  //         contains: params.searchTerm,
  //         mode: "insensitive",
  //       },
  //     })),
  //   });
  // }
  // List of fields that should be treated as booleans

  const booleanFields = ["availability"];

  const convertedFilterData = Object.keys(filterData).reduce((acc, key) => {
    let value = filterData[key];

    // Convert string to boolean for boolean fields
    if (booleanFields.includes(key)) {
      value = value === "true" || value === true;
    }

    acc[key] = value;
    return acc;
  }, {} as Record<string, any>);

  const andCondition: any[] = [];

  if (Object.keys(convertedFilterData).length > 0) {
    andCondition.push({
      AND: Object.keys(convertedFilterData).map((key) => {
        const value = convertedFilterData[key];
        const filterCondition: any = {
          equals: value,
        };

        // Only apply mode: "insensitive" for string fields, except for specific fields like bloodType
        if (typeof value === "string" && key !== "bloodType") {
          filterCondition.mode = "insensitive";
        }

        return {
          [key]: filterCondition,
        };
      }),
    });
  }

  // if (Object.keys(filterData).length > 0) {
  //   andCondition.push({
  //     AND: Object.keys(filterData).map((key) => ({
  //       [key]: {
  //         equals: (filterData as any)[key],
  //         mode: "insensitive",
  //       },
  //     })),
  //   });
  // }

  // if (Object.keys(filterData).length > 0) {
  //   andCondition.push({
  //     AND: Object.keys(filterData).map((key) => {
  //       const filterCondition: any = {
  //         equals: (filterData as any)[key],
  //       };

  //       // Only apply mode: "insensitive" for string fields, except for specific fields like bloodType
  //       if (
  //         typeof (filterData as any)[key] === "string" &&
  //         key !== "bloodType"
  //       ) {
  //         filterCondition.mode = "insensitive";
  //       }

  //       return {
  //         [key]: filterCondition,
  //       };
  //     }),
  //   });
  // }

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
    include: {
      user: true,
    },
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
  const donorData = await prisma.donor.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.request.deleteMany({
      where: {
        requesterId: donorData.id,
        receiverId: donorData.id,
      },
    });
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

const donorStatusChagne = async (id: string, query: any) => {
  const { status } = query;

  const donorData = await prisma.donor.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: donorData.email,
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

export const DonorService = {
  getAllDonorFromDB,
  getSingleDonorFromDB,
  donorDeleteIntoDB,
  donorSoftDeleteIntoDB,
  updateDonorIntoDB,
  donorStatusChagne,
};
