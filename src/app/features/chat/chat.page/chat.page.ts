import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CardInputActions} from './components/card-input-actions/card-input-actions';
import {CardModeActions} from './components/card-mode-actions/card-mode-actions';
import {CardChatMsgs} from './components/card-chat-msgs/card-chat-msgs';
import {AskChatbootService, AskText, BotMessage} from '@app/core';
import {finalize, Subscription} from 'rxjs';

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
export class ChatPage implements OnInit, OnDestroy {


  protected msgs: BotMessage[] = [];
  protected chatLoading: boolean = false;

  private subscription = new Subscription();

  private askChatbootService = inject(AskChatbootService);

  ngOnInit(): void {
    this.includeFirstMessage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected sendMsg(msg: AskText) {
    this.chatLoading = true;
    this.msgs.push({
      id: 1,
      role: 'user',
      text: msg.text
    })
    this.subscription.add(
      this.askChatbootService.chatSendText(msg)
        .pipe(finalize(() => this.chatLoading = false))
        .subscribe((result) => {
          this.msgs.push(result);
        })
    );
  }

  private includeFirstMessage() {
    this.chatLoading= true;
    const msg: BotMessage = {
      id: 0,
      role: "bot",
      text: "Olá, como posso lhe ajudar?"
    }
    this.msgs.push(msg);
    setTimeout(() => {
      this.chatLoading = false;
    }, 1000);
  }
}
