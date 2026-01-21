export const StorageKeys = {
    AUTH_STATE: 'auth_state',
    CODE_VERIFIER: 'code_verifier',
    ID_NONCE: 'id_nonce',
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
