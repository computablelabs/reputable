"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const participants = (state = [], action) => {
    const map = {
        // we will add an applicant to the state tree
        [constants_1.PARTICIPATE]: () => ([
            ...state,
            {
                name: action.payload.name,
                address: action.payload.address,
                owner: state.length === 0 ? true : false,
            }
        ]),
        [constants_1.RESET_PARTICIPANTS]: () => ([]),
    };
    // @ts-ignore:7017
    return map[action.type] ? map[action.type]() : state;
};
exports.default = participants;
