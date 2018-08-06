"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getList = ({ state, model, ids, predicate = () => true, }) => {
    const slice = state[model];
    if (!slice) {
        return [];
    }
    const data = slice.data;
    const list = ids ?
        ids.map((id) => data[id]).filter((item) => !!item) :
        Object.values(data);
    return list.filter(predicate);
};
const getItem = ({ state, model, key, predicate = () => true, }) => {
    const slice = state[model];
    if (!slice) {
        return undefined;
    }
    const item = slice.data[key];
    return predicate(item) ?
        item : undefined;
};
exports.default = {
    getList,
    getItem,
};
