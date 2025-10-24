import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class CardInputActions implements OnInit, OnChanges {

  @Input() loading: boolean = false;
  @Output() onSendMsg: EventEmitter<BotMessage> = new EventEmitter<BotMessage>();

  protected activatedMic: boolean = false;
  protected form!: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);
  public stt: SpeechService = inject(SpeechService);

  protected hint = '';
  private sub = new Subscription();

  ngOnInit(): void {
    this.buildForm();
    this.configStt();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] && this.form) {
      if (this.loading) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  protected sendAudioMsg() {
    setTimeout(() => {
      if (this.form.valid) {
        this.onSendMsg.emit({
          id: 0,
          role: 'user',
          text: this.form.get('msg')?.value
        });
      }
      this.form.reset();
    }, 400);
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

  protected startRecord(event?: Event) {
    event?.preventDefault();
    if (this.activatedMic) {
      return;
    }

    this.form.reset();
    if (!this.stt.supported.value) {
      alert('Reconhecimento de fala não suportado neste navegador.');
    } else {
      this.activatedMic = true;
      this.stt.start('pt-BR');
    }
  }

  protected stopRecord(event?: Event) {
    event?.preventDefault();
    if (!this.activatedMic) {
      return;
    }

    this.activatedMic = false;
    this.stt.stop();
    this.stt.clear();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      msg: [null, [Validators.required]]
    });
    this.form.disable();
  }

  private configStt() {
    this.sub.add(this.stt.final.subscribe(finalText => {
      this.hint = '';
      this.form.get('msg')?.patchValue(finalText.trim());
      this.sendAudioMsg()
    }));
    this.sub.add(this.stt.interim.subscribe(v => this.hint = v));

    this.sub.add(this.stt.listening
      .subscribe(listening => {
        this.activatedMic = listening;
      }));
  }
}
