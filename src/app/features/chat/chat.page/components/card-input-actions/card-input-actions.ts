import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-card-input-actions',
  imports: [
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './card-input-actions.html',
  styleUrl: './card-input-actions.scss'
})
export class CardInputActions {

  @Output() onSendMsg: EventEmitter<string> = new EventEmitter<string>();

  sendMsg() {
    this.onSendMsg.emit('Message teste');
  }
}
