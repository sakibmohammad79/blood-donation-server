import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../error/ApiError";
import { IPaginationOptions } from "../../interfaces/paginateOptions";
import { volunteerSearchableFields } from "./volunteer.constant";
import httpStatus from "http-status";

const createVolunteerIntoDB = async (payload: any) => {
    const volunteerInfo = await prisma.volunteer.findUnique({
      where: {
        email: payload.volunteer.email,
      },
    });
    const duplicateErrorCode = 409;
    if (volunteerInfo) {
      throw new ApiError(duplicateErrorCode, "Volunteer already exists!");
    }
  
    const result = await  prisma.volunteer.create({
        data: payload.volunteer
    })
  
 
    return result;
  };


  const getAllVolunteerFromDB = async (
    params: any,
    paginateOptions: IPaginationOptions
  ) => {
    const { searchTerm, ...filterData } = params;
    const { page, limit, skip } =
      paginationHelper.calculatePagination(paginateOptions);
  
    const andCondition: Prisma.VolunteerWhereInput[] = [];
    if (params.searchTerm) {
      andCondition.push({
        OR: volunteerSearchableFields.map((field) => ({
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
      isActive: true,
    });
  
    const whereCondition: Prisma.VolunteerWhereInput = { AND: andCondition };
    const result = await prisma.volunteer.findMany({
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
  
    const total = await prisma.volunteer.count({
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

  const activeVolunteer = async(id: string) => {
    const volunteerInfo = await prisma.volunteer.findUnique({
      where: {
        id,
        isActive: false
      },
    });
  
    if (volunteerInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, "Inactive volunteer not found!");
    }

    const activeVolunteer = await prisma.volunteer.update({
      where: {
        id
      },
      data: {
        isActive: true
      }
    })
    return activeVolunteer
  }
  const inactiveVolunteer = async(id: string) => {
    const volunteerInfo = await prisma.volunteer.findUnique({
      where: {
        id,
        isActive: true
      },
    });
  
    if (volunteerInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, "Active volunteer not found!");
    }

    const inactiveVolunteer = await prisma.volunteer.update({
      where: {
        id
      },
      data: {
        isActive: false
      }
    })
    return inactiveVolunteer
  }
  

  export const VolunteerService ={
    createVolunteerIntoDB,
    getAllVolunteerFromDB,
    activeVolunteer,
    inactiveVolunteer
  }