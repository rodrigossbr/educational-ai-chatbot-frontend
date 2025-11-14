import {modeTypes} from '@feature/chat/chat.page/components/card-mode-actions/card-mode-actions';

export interface ChatStorage {
  sessionId: number;
  selectedMode: modeTypes;
}
