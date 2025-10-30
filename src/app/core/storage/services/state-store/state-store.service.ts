import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {StorageService} from '@core/storage';

interface OptionStateStore {
  useLocalStorage: boolean;
  initialEmit: boolean;
}

@Injectable({
  providedIn: 'root',
})
export abstract class StateStoreService<T> {
  private stateStore$: Observable<T | undefined>;
  private valueState!: T;
  private stateSubject: ReplaySubject<T>;
  private readonly prefixKey: string;
  private readonly storageKey: string;
  private readonly storageService: StorageService;
  private customStorageKey: string = '';
  private stateOptions: OptionStateStore = {
    useLocalStorage: false,
    initialEmit: true,
  };

  protected constructor(
    prefixKey: string,
    key: string,
    options: Partial<OptionStateStore> = {
      useLocalStorage: false,
      initialEmit: true,
    },
  ) {
    this.prefixKey = prefixKey;
    this.storageKey = key;
    this.stateOptions = { ...this.stateOptions, ...options };
    const { useLocalStorage, initialEmit } = this.stateOptions;

    this.storageService = new StorageService(this.prefixKey, useLocalStorage);
    this.stateSubject = new ReplaySubject<T>(1);
    this.stateStore$ = this.stateSubject.asObservable();
    if (initialEmit) {
      this.emitInitialState();
    }
  }

  public abstract initialState(): T;

  public setCustomKey(key: string): void {
    this.customStorageKey = key;
    this.emitInitialState();
  }

  public getCustomKey(): string {
    return this.customStorageKey;
  }

  public hasCustomKey(key: string): boolean {
    const customKey = this.prefixKey + ':' + key + ':' + this.storageKey;

    return this.storageService.getKeys().some((k) => k.includes(customKey));
  }

  public updateState(
    newState: T,
    options: { emit: boolean } = { emit: true },
  ): void {
    this.saveToStorage(newState);
    this.emitState(newState, options);
  }

  public updatePartialState(
    partialState: Partial<T>,
    options: { emit: boolean } = { emit: true },
  ): void {
    const currentState = this.valueState;
    const newState = { ...currentState, ...partialState };
    this.saveToStorage(newState);
    this.emitState(newState, options);
  }

  public get state$(): Observable<T | undefined> {
    return this.stateStore$.pipe(map((state) => state || this.valueState));
  }

  public getState(): T {
    return this.valueState;
  }

  public clearState(options: { emit: boolean } = { emit: true }): void {
    this.valueState = undefined as unknown as T;
    this.storageService.removeItem(this.getStoreKey());
    this.emitState(undefined as unknown as T, options);
  }

  public clearStateAll(options: { emit: boolean } = { emit: true }): void {
    this.storageService.clear();
    this.emitState(undefined as unknown as T, options);
  }

  public clearAllStorages(): void {
    this.storageService.clearAllStorages();
  }

  public resetState(options: { emit: boolean } = { emit: true }): void {
    this.updateState(this.initialState(), options);
  }

  private emitInitialState() {
    const storedState = this.loadFromStorage();
    this.valueState = storedState || this.initialState();
    this.stateSubject.next(this.valueState);
  }

  private emitState(newState: T, options: { emit: boolean }) {
    if (options.emit) {
      this.stateSubject.next(newState);
    }
  }

  private loadFromStorage(): T | null {
    return this.storageService.getItem(this.getStoreKey());
  }

  private saveToStorage(state: T): void {
    this.valueState = state;
    this.storageService.setItem(this.getStoreKey(), state);
  }

  private getStoreKey(): string {
    return this.customStorageKey
      ? `${this.customStorageKey}:${this.storageKey}`
      : this.storageKey;
  }
}
