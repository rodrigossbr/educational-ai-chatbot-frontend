import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ChatLoading} from '@feature/chat/chat.page/components/card-chat-msgs/components/chat-loading/chat-loading';
import {MatIcon} from '@angular/material/icon';
import {BotMessage} from '@app/core';
import {TtsService} from '@core/services/tts/tts.service';
import {MarkdownPipe} from '@app/shared/pipes/markdown/markdown-pipe';
import {MatIconButton} from '@angular/material/button';
import {FocusTtsDirective} from '@app/shared';
import {ChatModeModel} from '@feature/chat/chat.page/models/chat-mode.model';

@Component({
  selector: 'app-chat-bot-msg',
  imports: [
    ChatLoading,
    MatIconButton,
    MatIcon,
    MarkdownPipe,
    FocusTtsDirective
  ],
  templateUrl: './chat-bot-msg.html',
  styleUrl: './chat-bot-msg.scss'
})
export class ChatBotMsg implements OnChanges {
  @Input() loading: boolean = false;
  @Input() userMsg!: BotMessage;
  @Input() msg!: BotMessage;
  @Input() mode!: ChatModeModel;

  @Output() likedModeChange: EventEmitter<BotMessage> = new EventEmitter();

  @ViewChild('content', {static: true}) private content!: ElementRef<HTMLElement>;

  private tts = inject(TtsService);

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['loading'] || changes['msg']) && !this.loading) {
      this.read();
    }
  }

  protected likeButtonSelect(msg: BotMessage) {
    this.msg.helpful = this.msg.helpful == true ? undefined : true;
    this.likedModeChange.emit(msg);
  }

  protected unlikeButtonSelect(msg: BotMessage) {
    this.msg.helpful = this.msg.helpful == false ? undefined : false;
    this.likedModeChange.emit(msg);
  }

  protected playTextSound(msg: BotMessage) {
    this.tts.read(msg.text);
  }

  protected get ariaLabel() {
    return this.userMsg
      ? `Reproduzir áudio de texto da pergunta ${this.userMsg.text}`
      : `Reproduzir áudio do chat inicial`;
  }

  protected get textoGenerativo() {
    return [
      'generativo',
      'generativo_simplificado',
      'feedback_recovery'
    ].includes(this.msg.detectedIntent || '') && this.msg.id != 0;
  }

  private read() {
    if (this.mode.voiceEnabled && this.msg.text) {
      this.tts.read(this.msg.text);
    } else {
      this.tts.cancel();
    }
  }
}
