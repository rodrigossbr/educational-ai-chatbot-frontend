export class StorageService {
  private readonly storage: Storage;
  private readonly prefix: string;

  public constructor(prefix: string, useLocalStorage: boolean = false) {
    this.prefix = prefix;
    this.storage = useLocalStorage ? localStorage : sessionStorage;
  }

  public setItem<T>(key: string, value: T): void {
    const fullKey = this.getKey(key);
    const stringValue = JSON.stringify(value);
    this.storage.setItem(fullKey, stringValue);
  }

  public getItem<T>(key: string): T | null {
    const fullKey = this.getKey(key);
    const value = this.storage.getItem(fullKey);
    return value ? (JSON.parse(value) as T) : null;
  }

  public getKeys(): string[] {
    return Object.keys(this.storage).filter((key) => {
      return key.startsWith(this.prefix);
    });
  }

  public removeItem(key: string): void {
    const fullKey = this.getKey(key);
    this.storage.removeItem(fullKey);
  }

  public clear(): void {
    Object.keys(this.storage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        this.storage.removeItem(key);
      }
    });
  }

  public clearAllStorages(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }
}
