interface Map {
    readonly [key: string]: any;
}
interface GenericMap<T> {
    readonly [key: string]: T;
}
export { Map, GenericMap };
