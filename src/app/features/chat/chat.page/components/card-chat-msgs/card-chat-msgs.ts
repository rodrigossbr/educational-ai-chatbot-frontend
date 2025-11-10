import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BotMessage, FeedbackService} from '@app/core';
import {AutoScrollDirective} from '@app/shared';
import {ChatBotMsg} from '@feature/chat/chat.page/components/card-chat-msgs/components/chat-bot-msg/chat-bot-msg';
import {modeTypes} from '@feature/chat/chat.page/components/card-mode-actions/card-mode-actions';
import {ChatUserMsg} from '@feature/chat/chat.page/components/card-chat-msgs/components/chat-user-msg/chat-user-msg';
import {Subscription} from 'rxjs';
import {ChatStorage} from '@feature/chat/chat.page/storage/chat-storage/models/chat-storage.model';

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
export class CardChatMsgs implements OnDestroy {
  @Input() msgs: BotMessage[] = [];
  @Input() mode: modeTypes = 'text';
  @Input() state: ChatStorage | undefined;
  @Input() loading: boolean = false;

  private subscription: Subscription = new Subscription();
  private feedbackService = inject(FeedbackService);

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected isLastLoading(msg: BotMessage) {
    return this.loading && (this.msgs.indexOf(msg) == (this.msgs.length - 1));
  }

  protected likedMode(msg: BotMessage): void {
    const userMsgIndex = this.msgs.indexOf(msg) - 1;
    const userMsg = this.msgs[userMsgIndex];

    console.log('TESTE: ', msg);
    this.subscription.add(
      this.feedbackService.sendFeedback({
        id: msg.feedbackId,
        sessionId: this.state?.sessionId as number,
        botAnswer: msg.text,
        userQuestion: userMsg.text,
        helpful: msg.helpful,
        detectedIntent: msg.detectedIntent
      }).subscribe(savedFeedback => {
        msg.feedbackId = savedFeedback.id
      })
    );
  }
}
