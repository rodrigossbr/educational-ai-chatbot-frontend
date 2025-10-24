import {AfterViewInit, Component, ElementRef, inject, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
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
  @Input() likedMode: 'liked' | 'unliked' | 'unselected' = 'unselected';

  @ViewChild('content', { static: true }) private content!: ElementRef<HTMLElement>;

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

  protected likeButtonSelect(likedMode: 'liked' | 'unliked' | 'unselected') {
      this.likedMode = likedMode;
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
