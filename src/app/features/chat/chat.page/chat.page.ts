import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CardInputActions} from './components/card-input-actions/card-input-actions';
import {CardModeActions, modeTypes} from './components/card-mode-actions/card-mode-actions';
import {CardChatMsgs} from './components/card-chat-msgs/card-chat-msgs';
import {AskText, BotMessage, ChatbootService, SessionService} from '@app/core';
import {finalize, Subscription} from 'rxjs';
import {FocusTtsDirective, HighContrast} from '@app/shared';
import {ChatStorageService} from '@feature/chat/chat.page/storage/chat-storage/chat-storage.service';
import {ChatStorage} from '@feature/chat/chat.page/storage/chat-storage/models/chat-storage.model';

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
    HighContrast,
    FocusTtsDirective
  ],
  templateUrl: './chat.page.html',
  styleUrl: './chat.page.scss'
})
export class ChatPage implements OnInit, OnDestroy {
  protected msgs: BotMessage[] = [];
  protected mode: modeTypes = 'text';
  protected state?: ChatStorage;
  protected chatLoading: boolean = false;

  private subscription = new Subscription();

  private chatbootService = inject(ChatbootService);
  private sessionService = inject(SessionService);
  private chatStorageService = inject(ChatStorageService);

  ngOnInit(): void {
    this.configuresStateStore();
    this.loadSession();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected onModeChange(mode: modeTypes) {
    this.mode = mode;
  }

  protected sendMsg(msg: AskText) {
    this.msgs.push({
      id: this.msgs.length,
      role: 'user',
      text: msg.text
    });

    this.askChatboot(msg);
  }

  private includeFirstMessage() {
    if (this.state?.sessionId && !this.msgs.length) {
      this.askChatboot({
        text: 'Olá'
      });
    }
  }

  private askChatboot(msg: AskText) {
    const botMsg: BotMessage = {
      id: this.msgs.length,
      role: 'bot',
      text: ''
    };
    this.chatLoading = true;
    this.msgs.push(botMsg);
    this.subscription.add(
      this.chatbootService.chatSendText({
        ...msg,
        sessionId: this.state?.sessionId,
      })
        .pipe(finalize(() => this.chatLoading = false))
        .subscribe((result) => {
          botMsg.text = result.text;
          botMsg.feedbackEnabled = result.feedbackEnabled;
          botMsg.detectedIntent = result.detectedIntent;
        })
    );
  }

  private configuresStateStore() {
    this.subscription.add(
      this.chatStorageService.state$.subscribe((state) => {
        this.state = state;
        this.includeFirstMessage();
      })
    );
  }

  private loadSession() {
    this.subscription.add(
      this.sessionService.getSession().subscribe((session) => {
        this.chatStorageService.updatePartialState({
          sessionId: session.sessionId
        });
      })
    );
  }
}
