"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameterizer = (state) => state.parameterizer;
exports.parameterizer = parameterizer;
const address = (state) => state.parameterizer && state.parameterizer.address;
exports.address = address;
