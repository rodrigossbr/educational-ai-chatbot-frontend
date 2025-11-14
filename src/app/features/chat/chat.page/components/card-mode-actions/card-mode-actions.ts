import {Component, EventEmitter, inject, model, OnDestroy, OnInit, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {FocusTtsDirective} from '@app/shared';
import {ChatStorageService} from '@feature/chat/chat.page/storage/chat-storage/chat-storage.service';
import {Subscription} from 'rxjs';

export type modeTypes = 'voice' | 'text' | 'libras';

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
  @Output() onModeChange: EventEmitter<modeTypes> = new EventEmitter<modeTypes>();
  protected mode: modeTypes = 'text';

  protected readonly model = model;

  private subscription: Subscription = new Subscription();

  private chatStorageService: ChatStorageService = inject(ChatStorageService);

  ngOnInit(): void {
    this.subscription.add(
      this.chatStorageService.state$
        .subscribe((state) => {
          this.mode = state?.selectedMode || 'text';
        }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectMode(mode: modeTypes) {
    this.mode = mode;
    this.chatStorageService.updatePartialState({selectedMode: mode});
    this.onModeChange.emit(mode);
  }
}
