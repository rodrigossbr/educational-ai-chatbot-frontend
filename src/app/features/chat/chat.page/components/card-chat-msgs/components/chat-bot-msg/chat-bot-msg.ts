import {
  AfterViewInit,
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
import {BotMessage, VlibrasService} from '@app/core';
import {TtsService} from '@core/services/tts/tts.service';
import {modeTypes} from '@feature/chat/chat.page/components/card-mode-actions/card-mode-actions';
import {MarkdownPipe} from '@app/shared/pipes/markdown/markdown-pipe';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-chat-bot-msg',
  imports: [
    ChatLoading,
    MatIconButton,
    MatIcon,
    MarkdownPipe
  ],
  templateUrl: './chat-bot-msg.html',
  styleUrl: './chat-bot-msg.scss'
})
export class ChatBotMsg implements AfterViewInit, OnChanges {
  @Input() loading: boolean = false;
  @Input() msg!: BotMessage;
  @Input() mode: modeTypes = 'text';

  @Output() likedModeChange: EventEmitter<BotMessage> = new EventEmitter();

  @ViewChild('content', {static: true}) private content!: ElementRef<HTMLElement>;

  private vlibrasService: VlibrasService = inject(VlibrasService);
  private tts = inject(TtsService);

  ngAfterViewInit() {
    this.vlibrasService.init().catch(console.error);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['loading'] || changes['mode']) && !this.loading) {
      this.traduzir();
      this.read();
    }
  }

  protected likeButtonSelect(msg: BotMessage) {
    this.msg.helpful = this.msg.helpful == true ? undefined : true;
    console.log('likeButtonSelect', msg)
    this.likedModeChange.emit(msg);
  }

  protected unlikeButtonSelect(msg: BotMessage) {
    this.msg.helpful = this.msg.helpful == false ? undefined : false;
    this.likedModeChange.emit(msg);
  }

  private traduzir() {
    if (this.mode !== 'libras') {
      return;
    }

    // const el = this.content.nativeElement;
    // const sel = window.getSelection();
    // const range = document.createRange();
    // range.selectNodeContents(el);
    // sel?.removeAllRanges();
    // sel?.addRange(range);

    this.vlibrasService.openWidget();
  }

  private read() {
    if (this.mode === 'voice' && this.msg.text) {
      this.tts.read(this.msg.text);
    } else {
      this.tts.cancel();
    }
  }
}
