import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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
  @Input() msgs: BotMessage[] = [];
  @Input() msg!: BotMessage;
  @Input() mode!: ChatModeModel;

  @Output() likedModeChange: EventEmitter<BotMessage> = new EventEmitter();

  private tts = inject(TtsService);

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['loading'] || changes['msg'] || changes['mode']) && !this.loading) {
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

  protected get msgText() {
    let msgText = this.msg.text;

    if (this.textoGenerativo) {
      msgText += ' Texto gerado por IA generativa';
    }

    return msgText;
  }

  protected get textoGenerativo() {
    return [
      'generativo',
      'generativo_simplificado',
      'feedback_recovery'
    ].includes(this.msg.detectedIntent || '') && this.msg.id != 0;
  }

  private read() {
    if (this.mode.voiceEnabled && this.msgText && this.lastMsg()) {
      this.tts.read(this.msgText);
    } else {
      this.tts.cancel();
    }
  }

  private lastMsg() {
    return this.msgs.indexOf(this.msg) === (this.msgs.length - 1);
  }
}
