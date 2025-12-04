import {ChatModeModel} from '@feature/chat/chat.page/models/chat-mode.model';

export interface ChatStorage {
  sessionId: number;
  chatMode: ChatModeModel;
}
