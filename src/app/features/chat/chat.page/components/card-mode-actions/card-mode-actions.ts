import {Component, EventEmitter, inject, Input, model, OnDestroy, OnInit, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {FocusTtsDirective} from '@app/shared';
import {ChatStorageService} from '@feature/chat/chat.page/storage/chat-storage/chat-storage.service';
import {Subscription} from 'rxjs';
import {ChatModeModel} from '@feature/chat/chat.page/models/chat-mode.model';

@Component({
  selector: 'app-card-mode-actions',
  imports: [
    MatButton,
    NgClass,
    MatIcon,
    FocusTtsDirective
  ],
  templateUrl: './card-mode-actions.html',
  styleUrl: './card-mode-actions.scss'
})
export class CardModeActions implements OnInit, OnDestroy {

  @Input() mode!: ChatModeModel;
  @Output() onModeChange: EventEmitter<ChatModeModel> = new EventEmitter<ChatModeModel>();
  @Output() onOpenVlibrasChange: EventEmitter<void> = new EventEmitter<void>();

  protected readonly model = model;

  private subscription: Subscription = new Subscription();

  private chatStorageService: ChatStorageService = inject(ChatStorageService);

  ngOnInit(): void {
    this.subscription.add(
      this.chatStorageService.state$
        .subscribe((state) => {
          this.mode = state?.chatMode || {
            simplifiedTextEnabled: false,
            voiceEnabled: true,
            highContrastEnabled: false
          };
        }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected selectVoiceMode(): void {
    this.mode.voiceEnabled = !this.mode.voiceEnabled;
    this.chatStorageService.updatePartialState({
      chatMode: this.mode
    });
    this.onModeChange.emit(this.mode);
  }

  protected selectTextMode(): void {
    this.mode.simplifiedTextEnabled = !this.mode.simplifiedTextEnabled;
    this.chatStorageService.updatePartialState({
      chatMode: this.mode
    });
    this.onModeChange.emit(this.mode);
  }

  protected selectVelibrasMode(): void {
    this.onOpenVlibrasChange.emit();
  }
}
