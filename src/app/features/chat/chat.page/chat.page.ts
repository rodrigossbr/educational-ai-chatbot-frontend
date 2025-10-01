import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CardInputActions} from './components/card-input-actions/card-input-actions';
import {CardModeActions} from './components/card-mode-actions/card-mode-actions';
import {CardChatMsgs} from './components/card-chat-msgs/card-chat-msgs';
import {Message} from '@app/core';

@Component({
  selector: 'app-chat.page',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatCardTitle,
    MatButton,
    MatIcon,
    CardInputActions,
    CardModeActions,
    CardChatMsgs
  ],
  templateUrl: './chat.page.html',
  styleUrl: './chat.page.scss'
})
export class ChatPage {

  msgs: Message[] = [
    {
      id: 1,
      role: 'bot',
      text: 'Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 Teste 1 '
    },
    {
      id: 2,
      role: 'user',
      text: 'Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 '
    },
    {
      id: 3,
      role: 'bot',
      text: 'Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 '
    },
    {
      id: 4,
      role: 'user',
      text: 'Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 '
    },
    {
      id: 5,
      role: 'bot',
      text: 'Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 '
    },
    {
      id: 6,
      role: 'user',
      text: 'Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 '
    },
    {
      id: 7,
      role: 'bot',
      text: 'Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 '
    },
    {
      id: 8,
      role: 'user',
      text: 'Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 Teste 2 '
    }
  ];

  sendMsg(msg: string) {
    this.msgs.push({
      id: this.msgs.length,
      role: 'user',
      text: msg
    })
  }
}
