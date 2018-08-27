"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'attributeStore';
const getAttributeStoreAddress = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return '';
    }
    const data = stateItem.data;
    if (!data) {
        return '';
    }
    return data.address;
};
exports.getAttributeStoreAddress = getAttributeStoreAddress;
