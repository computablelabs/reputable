"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token = (state) => state.token;
exports.token = token;
const address = (state) => state.token && state.token.address;
exports.address = address;
