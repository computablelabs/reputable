"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const apply = (name, deposit, data) => {
    const payload = { name, deposit, data };
    return { type: constants_1.APPLY, payload };
};
exports.apply = apply;
