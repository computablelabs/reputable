export default interface Reducer<T, U> {
    (t: T, u: U): T;
}
