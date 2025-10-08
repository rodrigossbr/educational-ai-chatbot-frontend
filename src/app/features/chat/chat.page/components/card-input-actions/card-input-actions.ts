import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BotMessage} from '@app/core';
import {Subscription} from 'rxjs';
import {SpeechService} from '@core/services/speech/speech.service';

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

  protected activatedMic: boolean = false;
  protected form!: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);
  public stt: SpeechService = inject(SpeechService);

  private text = '';
  protected hint = '';
  private sub = new Subscription();

  public ngOnInit(): void {
    this.buildForm();
    this.configStt();
  }

  protected sendAudioMsg() {
    if (this.form.valid) {
      this.onSendMsg.emit({
        id: 0,
        role: 'user',
        text: this.form.get('msg')?.value
      });
    }
    this.form.reset();
  }

  protected sendTextMsg() {
    if (this.form.valid) {
      this.onSendMsg.emit({
        id: 0,
        role: 'user',
        text: this.form.get('msg')?.value
      });
    }
    this.form.reset();
  }

  protected startRecord() {
    if (!this.stt.supported.value) {
      alert('Reconhecimento de fala não suportado neste navegador.');
    } else if (this.stt.listening.value) {
      this.stt.stop();
    } else {
      this.stt.start();
    }
  }

  protected stopRecord() {
    this.stt.stop();
    this.sendAudioMsg()
  }

  private buildForm(): void {
    this.form = this.fb.group({
      msg: [null, [Validators.required]]
    });
  }

  private configStt() {
    // quando sair o final, coloca no input (anexa com espaço se já tiver texto)
    this.sub.add(this.stt.final.subscribe(finalText => {
      this.text = this.text ? (this.text.trim() + ' ' + finalText) : finalText;
      this.hint = '';
      this.form.get('msg')?.patchValue(this.text);
    }));
    // interim (rascunho) aparece como dica
    this.sub.add(this.stt.interim.subscribe(v => this.hint = v));

    this.sub.add(this.stt.listening
      .subscribe(listening => {
        this.activatedMic = listening;
      }));
  }
}
