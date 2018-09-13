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
const helpers_1 = require("computable/dist/helpers");
const constants_1 = require("../../../constants");
const selectors_1 = require("../../selectors");
const initializers_1 = require("../../../initializers");
const actions_1 = require("./actions");
const deployAttributeStore = () => ((dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    const state = getState();
    const args = {};
    dispatch(actions_1.attributeStoreRequest(args));
    try {
        const owner = selectors_1.getOwner(state);
        if (!owner) {
            throw new Error(constants_1.Errors.NO_ADMIN_FOUND);
        }
        const websocketAddress = selectors_1.getWebsocketAddress(state);
        if (!websocketAddress) {
            throw new Error(constants_1.Errors.NO_WEBSOCKETADDRESS_FOUND);
        }
        const web3 = yield initializers_1.getWeb3(websocketAddress);
        const contract = yield helpers_1.deployAttributeStore(web3, owner.address);
        const contractAddress = contract.options.address;
        dispatch(actions_1.attributeStoreOk({ address: contractAddress }));
        return contractAddress;
    }
    catch (err) {
        dispatch(actions_1.attributeStoreError(err));
        return '';
    }
}));
exports.deployAttributeStore = deployAttributeStore;
const resetAttributeStore = () => ((dispatch) => __awaiter(this, void 0, void 0, function* () {
    return (dispatch(actions_1.attributeStoreReset()));
}));
exports.resetAttributeStore = resetAttributeStore;
