import {Component, model} from '@angular/core';
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

  mode: modeTypes = 'voice';

  protected readonly model = model;

  selectMode(mode: modeTypes) {
    this.mode = mode;
  }
}
