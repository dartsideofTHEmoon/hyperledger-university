class StringStore {
    constructor(protected key: string) {
    }

    get(): string | undefined {
        return window.localStorage[this.key]
    }

    set(value: string) {
        window.localStorage[this.key] = value
    }

    clear() {
        window.localStorage.removeItem(this.key)
    }
}

class ObjectStore<T> {
    stringStore: StringStore

    constructor(key: string) {
        this.stringStore = new StringStore(key)
    }

    get(): T | undefined {
        const stringified = this.stringStore.get()

        if (stringified) {
            return JSON.parse(stringified) as T
        }
    }

    set(value: T) {
        this.stringStore.set(JSON.stringify(value))
    }

    clear() {
        this.stringStore.clear()
    }
}

export const apiTokenStore = new StringStore('notaryApiToken')
export const apiUserStore = new ObjectStore<any>('notaryApiUser')
export const apiWalletStore = new ObjectStore<any>('notaryFabricWallet')
