import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BotMessage} from '@app/core';

@Component({
  selector: 'app-card-input-actions',
  imports: [
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './card-input-actions.html',
  styleUrl: './card-input-actions.scss'
})
export class CardInputActions implements OnInit {
  @Output() onSendMsg: EventEmitter<BotMessage> = new EventEmitter<BotMessage>();

  protected form!: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.buildForm();
  }

  protected sendAudioMsg() {
    if (this.form.valid) {
      this.onSendMsg.emit({
        id: 0,
        role: 'user',
        text: this.form.get('msg')?.value
      });
    }
  }

  protected sendTextMsg() {
    if (this.form.valid) {
      this.onSendMsg.emit({
        id: 0,
        role: 'user',
        text: this.form.get('msg')?.value
      });
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      msg: [null, [Validators.required]]
    });
  }
}
