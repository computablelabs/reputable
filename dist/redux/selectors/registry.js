"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'registry';
const getRegistry = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return undefined;
    }
    return stateItem ?
        stateItem : undefined;
};
exports.getRegistry = getRegistry;
const getRegistryAddress = (state = {}) => {
    const registry = getRegistry(state);
    return registry && registry.address ?
        registry.address : '';
};
exports.getRegistryAddress = getRegistryAddress;
