"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
class BoundHandler {
    constructor(onChange, select) {
        this.onChange = onChange;
        this.select = select;
        this.handler = () => {
            const nextState = this.select ? this.select(store_1.default.getState()) : store_1.default.getState();
            if (nextState !== this.currentState) {
                this.currentState = nextState;
                this.onChange(this.currentState);
            }
        };
    }
}
const subscriber = (onChange, select) => {
    const bound = new BoundHandler(onChange, select);
    const unsubscribe = store_1.default.subscribe(bound.handler);
    bound.handler();
    return unsubscribe;
};
exports.default = subscriber;
