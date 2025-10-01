import {Component, Input} from '@angular/core';
import {Message} from '@app/core';
import {MatIcon} from '@angular/material/icon';
import {AutoScrollDirective} from '@app/shared';

@Component({
  selector: 'app-card-chat-msgs',
  imports: [
    MatIcon,
    AutoScrollDirective
  ],
  templateUrl: './card-chat-msgs.html',
  styleUrl: './card-chat-msgs.scss'
})
export class CardChatMsgs {

  @Input()
  msgs: Message[] = [];
}
