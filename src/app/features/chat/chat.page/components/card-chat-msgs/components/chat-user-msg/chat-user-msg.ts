import {Component, Input} from '@angular/core';
import {BotMessage} from '@app/core';

@Component({
  selector: 'app-chat-user-msg',
  imports: [],
  templateUrl: './chat-user-msg.html',
  styleUrl: './chat-user-msg.scss'
})
export class ChatUserMsg {

  @Input() msg!: BotMessage;
}
