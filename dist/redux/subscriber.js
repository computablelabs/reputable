"use strict";
/*
 * A Function taking an 'onChange' callback, and an optional selection Filter.
 * These are used to subscribe to the redux store's change call, and filter the call to
 * getState thru <select> if provided. Eventually the provided <onChange> is called (if
 * the current state is different from the last seen)
 */
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
    // TODO make this initial call optional?
    bound.handler();
    return unsubscribe;
};
exports.default = subscriber;
