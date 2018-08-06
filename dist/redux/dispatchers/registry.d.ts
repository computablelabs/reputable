declare const apply: (name: string, deposit?: string | number | undefined, data?: string | undefined) => void;
declare const deployRegistry: (name: string, address?: string | undefined) => Promise<string>;
declare const resetRegistry: () => void;
export { apply, deployRegistry, resetRegistry };
