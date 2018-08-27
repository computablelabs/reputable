declare const participate: (name: string, address: string) => Promise<void>;
declare const resetParticipants: () => Promise<void>;
export { participate, resetParticipants };
