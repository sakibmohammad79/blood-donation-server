import prisma from "../../../shared/prisma";
import ApiError from "../../error/ApiError";

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

  export const VolunteerService ={
    createVolunteerIntoDB
  }