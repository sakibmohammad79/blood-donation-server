"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//obj => all query;  key: field name
const pick = (obj, keys) => {
    const finalQuery = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalQuery[key] = obj[key];
        }
    }
    return finalQuery;
};
exports.default = pick;
