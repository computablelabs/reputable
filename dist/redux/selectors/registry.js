"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry = (state) => state.registry;
exports.registry = registry;
const address = (state) => state.registry && state.registry.address;
exports.address = address;
