declare module 'ganache-cli' {
  export function provider(): string;
  export function server(options:any): any;
}
