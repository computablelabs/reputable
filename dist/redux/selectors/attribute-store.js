"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'attributeStoreAddress';
const getAttributeStoreAddress = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return '';
    }
    const data = stateItem.data;
    if (!data) {
        return '';
    }
    const keys = Object.keys(data);
    return keys.length ?
        data[keys[0]] : '';
};
exports.getAttributeStoreAddress = getAttributeStoreAddress;
