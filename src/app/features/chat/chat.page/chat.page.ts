import {AfterViewInit, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CardInputActions} from './components/card-input-actions/card-input-actions';
import {CardModeActions} from './components/card-mode-actions/card-mode-actions';
import {CardChatMsgs} from './components/card-chat-msgs/card-chat-msgs';
import {AskText, BotMessage, ChatbootService, SessionService, VlibrasService} from '@app/core';
import {finalize, Subscription} from 'rxjs';
import {FocusTtsDirective, HighContrast, ObjectUtils} from '@app/shared';
import {ChatStorageService} from '@feature/chat/chat.page/storage/chat-storage/chat-storage.service';
import {ChatStorage} from '@feature/chat/chat.page/storage/chat-storage/models/chat-storage.model';
import {InfoDialogService} from '@app/shared/dialogs';
import {ChatModeModel} from '@feature/chat/chat.page/models/chat-mode.model';

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
export class ChatPage implements AfterViewInit, OnInit, OnDestroy {
  protected msgs: BotMessage[] = [];
  protected mode: ChatModeModel = {
    voiceEnabled: true,
    simplifiedTextEnabled: false,
    highContrastEnabled: false
  };
  protected state?: ChatStorage;
  protected chatLoading: boolean = false;
  protected openedDialog: boolean = false;

  private subscription = new Subscription();

  private chatbootService = inject(ChatbootService);
  private sessionService = inject(SessionService);
  private chatStorageService = inject(ChatStorageService);
  private infoDialogService = inject(InfoDialogService);
  private vlibrasService: VlibrasService = inject(VlibrasService);

  ngAfterViewInit() {
    this.vlibrasService.init().catch(console.error);
  }

  ngOnInit(): void {
    this.configuresStateStore();
    this.loadSession();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected onModeChange(mode: ChatModeModel) {
    this.mode = ObjectUtils.deepCopy(mode);

    if (this.mode.simplifiedTextEnabled) {
      const msgUsers = this.msgs.filter(m => m.role === 'user');
      const msgSend = msgUsers[msgUsers.length - 1];
      this.sendMsg(msgSend);
    }
  }

  protected sendMsg(msg: AskText) {
    this.msgs.push({
      id: this.msgs.length,
      role: 'user',
      text: msg.text,
      simplify: this.mode.simplifiedTextEnabled,
      lastMessages: []
    });

    this.askChatboot(msg);
  }

  protected openInfoDialog() {
    this.openedDialog = true;
    this.subscription.add(
      this.infoDialogService
        .openDialog()
        .subscribe(() => (this.openedDialog = false))
    );
  }

  protected onOpenVlibrasChange() {
    this.vlibrasService.openWidget();
  }

  private includeFirstMessage() {
    if (this.state?.sessionId && !this.msgs.length) {
      this.askChatboot({
        text: 'Olá',
        simplify: this.mode.simplifiedTextEnabled,
      });
    }
  }

  private askChatboot(msg: AskText) {
    const botMsg: BotMessage = {
      id: this.msgs.length,
      role: 'bot',
      text: msg.text,
      simplify: this.mode.simplifiedTextEnabled,
      lastMessages: this.lastMessages
    };
    this.chatLoading = true;
    this.msgs.push(botMsg);
    this.subscription.add(
      this.chatbootService.chatSendText({
        ...botMsg,
        sessionId: this.state?.sessionId,
      })
        .pipe(finalize(() => {
          this.chatLoading = false;
          const state = this.chatStorageService.getState();
          state.chatMode.simplifiedTextEnabled = false;
          this.chatStorageService.updatePartialState(
            state
          );
        }))
        .subscribe((result) => {
          botMsg.text = result.text;
          botMsg.feedbackEnabled = result.feedbackEnabled;
          botMsg.detectedIntent = result.detectedIntent;
        })
    );
  }

  private get lastMessages(): BotMessage[] {
    return this.msgs.slice(-3).reverse() || [];
  }

  private configuresStateStore() {
    this.subscription.add(
      this.chatStorageService.state$.subscribe((state) => {
        this.state = state;
        this.mode = this.state?.chatMode as ChatModeModel;
        this.includeFirstMessage();
      })
    );
  }

  private loadSession() {
    this.subscription.add(
      this.sessionService.getSession().subscribe((session) => {
        this.chatStorageService.updatePartialState({
          sessionId: session.sessionId,
        });
      })
    );
  }
}
