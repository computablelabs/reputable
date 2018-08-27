import { Map } from '.';
interface StateItem<T> {
    readonly loading: boolean;
    readonly request: Map;
    readonly data: T;
    readonly error?: Error | string;
}
export default StateItem;
