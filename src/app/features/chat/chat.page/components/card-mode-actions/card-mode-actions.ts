import {Component, EventEmitter, model, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgClass} from '@angular/common';

type modeTypes = 'voice' | 'text' | 'libras';

@Component({
  selector: 'app-card-mode-actions',
  imports: [
    MatButton,
    NgClass
  ],
  templateUrl: './card-mode-actions.html',
  styleUrl: './card-mode-actions.scss'
})
export class CardModeActions {

  @Output() onModeChange: EventEmitter<modeTypes> = new EventEmitter<modeTypes>();

  protected mode: modeTypes = 'text';

  protected readonly model = model;

  selectMode(mode: modeTypes) {
    this.mode = mode;
    this.onModeChange.emit(mode);
  }
}
