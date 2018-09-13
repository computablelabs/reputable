"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTICIPANTS_OK = 'PARTICIPANTS_OK';
exports.PARTICIPANTS_RESET = 'PARTICIPANTS_RESET';
exports.participantsOk = (value) => ({
    type: exports.PARTICIPANTS_OK,
    payload: value,
});
exports.participantsReset = () => ({
    type: exports.PARTICIPANTS_RESET,
    payload: {},
});
const participate = (name, address) => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(exports.participantsOk({ name, address })));
}));
exports.participate = participate;
const resetParticipants = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(exports.participantsReset()));
}));
exports.resetParticipants = resetParticipants;
