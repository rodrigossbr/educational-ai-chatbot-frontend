import {Component, Input} from '@angular/core';
import {BotMessage} from '@app/core';
import {AutoScrollDirective} from '@app/shared';
import {ChatBotMsg} from '@feature/chat/chat.page/components/card-chat-msgs/components/chat-bot-msg/chat-bot-msg';
import {modeTypes} from '@feature/chat/chat.page/components/card-mode-actions/card-mode-actions';
import {ChatUserMsg} from '@feature/chat/chat.page/components/card-chat-msgs/components/chat-user-msg/chat-user-msg';

@Component({
  selector: 'app-card-chat-msgs',
  imports: [
    AutoScrollDirective,
    ChatBotMsg,
    ChatUserMsg
  ],
  templateUrl: './card-chat-msgs.html',
  styleUrl: './card-chat-msgs.scss'
})
export class CardChatMsgs {

  @Input() msgs: BotMessage[] = [];
  @Input() mode: modeTypes = 'text';
  @Input() loading: boolean = false;

  protected isLastLoading(msg: BotMessage) {
    return this.loading && (this.msgs.indexOf(msg) == (this.msgs.length - 1));
  }
}
