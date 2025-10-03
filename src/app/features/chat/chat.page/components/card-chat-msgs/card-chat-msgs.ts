import {Component, Input} from '@angular/core';
import {BotMessage} from '@app/core';
import {MatIcon} from '@angular/material/icon';
import {AutoScrollDirective} from '@app/shared';
import {ChatLoading} from '@feature/chat/chat.page/components/card-chat-msgs/components/chat-loading/chat-loading';

@Component({
  selector: 'app-card-chat-msgs',
  imports: [
    MatIcon,
    AutoScrollDirective,
    ChatLoading
  ],
  templateUrl: './card-chat-msgs.html',
  styleUrl: './card-chat-msgs.scss'
})
export class CardChatMsgs {

  @Input() msgs: BotMessage[] = [];
  @Input() loading: boolean = false;

  protected isLastLoading(msg: BotMessage) {
    return this.loading && (this.msgs.indexOf(msg) == (this.msgs.length - 1));
  }
}
