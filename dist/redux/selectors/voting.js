"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voting = (state) => state.voting;
exports.voting = voting;
const address = (state) => state.voting && state.voting.address;
exports.address = address;
