import {Injectable} from '@angular/core';
import {StateStoreService} from '@core/storage';
import {ChatStorage} from '@feature/chat/chat.page/storage/chat-storage/models/chat-storage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStorageService extends StateStoreService<ChatStorage> {

  public constructor() {
    super('session', 'data', {useLocalStorage: true, initialEmit: true});
  }

  public initialState(): ChatStorage {
    return {
      sessionId: 0,
      chatMode: {
        simplifiedTextEnabled: false,
        voiceEnabled: true,
        highContrastEnabled: false
      },
    } as ChatStorage;
  }
}
