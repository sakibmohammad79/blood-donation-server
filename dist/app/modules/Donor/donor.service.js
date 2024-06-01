"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorService = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllDonorFromDB = (params, paginateOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    console.log(filterData);
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginateOptions);
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
    }, {});
    const andCondition = [];
    if (Object.keys(convertedFilterData).length > 0) {
        andCondition.push({
            AND: Object.keys(convertedFilterData).map((key) => {
                const value = convertedFilterData[key];
                const filterCondition = {
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
    const whereCondition = { AND: andCondition };
    const result = yield prisma_1.default.donor.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: paginateOptions.sortBy && paginateOptions.sortOrder
            ? {
                [paginateOptions.sortBy]: paginateOptions.sortOrder,
            }
            : { createdAt: "asc" },
        include: {
            user: true,
        },
    });
    const total = yield prisma_1.default.donor.count({
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
});
const getSingleDonorFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    return result;
});
const donorDeleteIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const donorData = yield prisma_1.default.donor.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.request.deleteMany({
            where: {
                requesterId: donorData.id,
                receiverId: donorData.id,
            },
        });
        const donorDeleteData = yield transactionClient.donor.delete({
            where: {
                id,
            },
        });
        yield transactionClient.user.delete({
            where: {
                email: donorDeleteData.email,
            },
        });
        return donorDeleteData;
    }));
    return result;
});
const donorSoftDeleteIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const donorDeleteData = yield transactionClient.donor.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
        yield transactionClient.user.update({
            where: {
                email: donorDeleteData.email,
            },
            data: {
                status: client_1.UserStatus.DELETED,
            },
        });
        return donorDeleteData;
    }));
    return result;
});
const updateDonorIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.donor.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield prisma_1.default.donor.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const donorStatusChagne = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = query;
    const donorData = yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: donorData.email,
        },
    });
    let result;
    if (status === client_1.UserStatus.ACTIVE) {
        result = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: { status: client_1.UserStatus.ACTIVE },
        });
    }
    if (status === client_1.UserStatus.BLOCKED) {
        result = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: { status: client_1.UserStatus.BLOCKED },
        });
    }
    if (status === client_1.UserStatus.DELETED) {
        result = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: { status: client_1.UserStatus.DELETED },
        });
    }
    return result;
});
exports.DonorService = {
    getAllDonorFromDB,
    getSingleDonorFromDB,
    donorDeleteIntoDB,
    donorSoftDeleteIntoDB,
    updateDonorIntoDB,
    donorStatusChagne,
};
