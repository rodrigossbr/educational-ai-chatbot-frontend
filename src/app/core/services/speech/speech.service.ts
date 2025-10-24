import {Inject, Injectable, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, Subject} from 'rxjs';

type SR = typeof window extends any ? any : never;

@Injectable({providedIn: 'root'})
export class SpeechService {
  private rec: SR | null = null;
  readonly supported = new BehaviorSubject<boolean>(false);
  readonly listening = new BehaviorSubject<boolean>(false);
  readonly interim = new BehaviorSubject<string>('');
  readonly final = new Subject<string>();

  constructor(@Inject(PLATFORM_ID) pid: object, private zone: NgZone) {
    if (!isPlatformBrowser(pid)) return;
    const SRClass: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SRClass) {
      this.supported.next(false);
      return;
    }

    this.rec = new SRClass();
    this.rec.continuous = false;          // uma frase por vez (ajuste p/ true se quiser)
    this.rec.interimResults = true;       // mostra rascunho enquanto fala
    this.rec.lang = 'pt-BR';
    this.rec.maxAlternatives = 1;

    this.rec.onstart = () => this.zone.run(() => this.listening.next(true));
    this.rec.onend = () => this.zone.run(() => {
      this.listening.next(false);
      this.interim.next('');
    });
    this.rec.onerror = (_e: any) => this.zone.run(() => this.listening.next(false));

    this.rec.onresult = (ev: any) => {
      let interim = '';
      let final = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0]?.transcript || '';
        if (ev.results[i].isFinal) final += t;
        else interim += t;
      }
      this.zone.run(() => {
        if (interim) this.interim.next(interim);
        if (final) {
          this.final.next(final.trim());
          this.interim.next('');
        }
      });
    };

    this.supported.next(true);
  }

  start(lang = 'pt-BR') {
    if (!this.rec) return;
    if (this.listening.value) return;
    this.rec.lang = lang || 'pt-BR';
    try {
      this.rec.start();
    } catch { /* já estava rodando */
    }
  }

  stop() {
    try {
      this.rec?.stop();
    } catch {
    }
  }

  abort() {
    try {
      this.rec?.abort();
    } catch {
    }
  }

  clear() {
    this.interim.next('');
  }

  async restart(lang = 'pt-BR') {
    if (!this.rec) {
      return;
    }
    if (this.listening.value) {
      this.stop();
    }

    await new Promise(r => setTimeout(r, 120)); // dá tempo do onend drenar
    this.start(lang);
  }
}
