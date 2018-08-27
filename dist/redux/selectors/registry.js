"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'registry';
const getRegistry = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return undefined;
    }
    return stateItem.data;
};
exports.getRegistry = getRegistry;
const getRegistryAddress = (state = {}) => {
    const registry = getRegistry(state);
    if (!registry || !registry.address) {
        return '';
    }
    return registry.address;
};
exports.getRegistryAddress = getRegistryAddress;
const getApplicants = (state = {}) => {
    const registry = getRegistry(state);
    if (!registry) {
        return [];
    }
    const applicants = registry.applicants;
    if (!applicants) {
        return [];
    }
    return applicants;
};
exports.getApplicants = getApplicants;
