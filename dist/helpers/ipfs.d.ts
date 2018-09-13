declare const IPFSWrite: (data: string) => Promise<string>;
declare const IPFSRead: (cid: string) => Promise<string>;
export { IPFSWrite, IPFSRead };
