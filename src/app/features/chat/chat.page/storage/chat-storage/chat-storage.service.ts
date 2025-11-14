import {Injectable} from '@angular/core';
import {StateStoreService} from '@core/storage';
import {ChatStorage} from '@feature/chat/chat.page/storage/chat-storage/models/chat-storage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStorageService extends StateStoreService<ChatStorage> {

  public constructor() {
    super('session', 'data', {useLocalStorage: false, initialEmit: false});
  }

  public initialState(): ChatStorage {
    return {
      sessionId: 0,
      selectedMode: 'text',
    } as ChatStorage;
  }
}
