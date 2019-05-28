export type KeyHandlers<T extends {[key: string]: any} = any> = { [key in keyof Partial<T>]: (keyEvent?: KeyboardEvent) => void }
