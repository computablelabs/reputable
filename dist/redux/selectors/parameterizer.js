"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'parameterizer';
const getParameterizer = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return undefined;
    }
    return stateItem.data;
};
exports.getParameterizer = getParameterizer;
const getParameterizerAddress = (state = {}) => {
    const parameterizer = getParameterizer(state);
    if (!parameterizer || !parameterizer.address) {
        return '';
    }
    return parameterizer.address;
};
exports.getParameterizerAddress = getParameterizerAddress;
