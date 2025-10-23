import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CardInputActions} from './components/card-input-actions/card-input-actions';
import {CardModeActions, modeTypes} from './components/card-mode-actions/card-mode-actions';
import {CardChatMsgs} from './components/card-chat-msgs/card-chat-msgs';
import {AskText, BotMessage, ChatbootService} from '@app/core';
import {finalize, Subscription} from 'rxjs';
import {HighContrast} from '@app/shared';

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
    CardChatMsgs,
    HighContrast
  ],
  templateUrl: './chat.page.html',
  styleUrl: './chat.page.scss'
})
export class ChatPage implements OnInit, OnDestroy {
  protected msgs: BotMessage[] = [];
  protected mode: modeTypes = 'text';
  protected chatLoading: boolean = false;

  private subscription = new Subscription();

  private chatbootService = inject(ChatbootService);

  ngOnInit(): void {
    this.includeFirstMessage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected onModeChange(mode: modeTypes) {
    this.mode = mode;
  }

  protected sendMsg(msg: AskText) {
    this.msgs.push({
      id: 1,
      role: 'user',
      text: msg.text
    });

    this.askChatboot(msg);
  }

  private includeFirstMessage() {
    this.askChatboot({
      text: 'Olá'
    });
  }

  private askChatboot(msg: AskText) {
    const botMsg: BotMessage = {
      id: 1,
      role: 'bot',
      text: ''
    };
    this.chatLoading = true;
    this.msgs.push(botMsg);
    this.subscription.add(
      this.chatbootService.chatSendText(msg)
        .pipe(finalize(() => this.chatLoading = false))
        .subscribe((result) => {
          botMsg.text = result.text;
        })
    );
  }
}
