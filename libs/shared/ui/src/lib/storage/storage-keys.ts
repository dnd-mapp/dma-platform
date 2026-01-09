export const StorageKeys = {} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
