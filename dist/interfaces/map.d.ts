interface Map {
    [key: string]: any;
}
interface GenericMap<T> {
    [key: string]: T;
}
export { Map, GenericMap };
