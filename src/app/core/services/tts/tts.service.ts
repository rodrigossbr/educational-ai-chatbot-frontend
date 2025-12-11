import {Inject, Injectable, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, Subject} from 'rxjs';
import {filter, take} from 'rxjs/operators'; // <--- Importante: Adicione isso

@Injectable({providedIn: 'root'})
export class TtsService {
  private synth: SpeechSynthesis | null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  voices$ = new BehaviorSubject<SpeechSynthesisVoice[]>([]);
  speaking$ = new BehaviorSubject<boolean>(false);
  boundary$ = new Subject<number>();
  rate = 1.4;

  constructor(@Inject(PLATFORM_ID) pid: object, private zone: NgZone) {
    this.synth = isPlatformBrowser(pid) ? window.speechSynthesis : null;
    if (!this.synth) return;

    const loadVoices = () => {
      const v = this.synth!.getVoices();
      if (v && v.length) {
        this.voices$.next(v);
      }
    };

    loadVoices();

    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  read(text: string) {
    this.cancel();
    this.voices$.pipe(
      filter(voices => voices.length > 0),
      take(1)
    ).subscribe(() => {
      const voice = this.defaultPtBrVoice();
      this.speak(text, {voice, rate: this.rate, lang: voice?.lang || 'pt-BR'});
    });
  }

  pause() {
    this.synth?.pause();
  }

  resume() {
    this.synth?.resume();
  }

  cancel() {
    this.synth?.cancel();
    this.speaking$.next(false);
  }

  private speak(text: string, opts?: {
    voice?: SpeechSynthesisVoice;
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string
  }) {
    this.cancel();
    if (!this.synth) return;

    const chunks = this.chunk(text);

    const speakOne = (i: number) => {
      if (i >= chunks.length) {
        this.zone.run(() => this.speaking$.next(false));
        return;
      }

      const u = new SpeechSynthesisUtterance(chunks[i]);

      this.currentUtterance = u;

      if (opts?.voice) u.voice = opts.voice;
      u.lang = opts?.lang ?? opts?.voice?.lang ?? 'pt-BR';
      u.rate = opts?.rate ?? 1;
      u.pitch = opts?.pitch ?? 1;
      u.volume = opts?.volume ?? 1;

      u.onstart = () => this.zone.run(() => this.speaking$.next(true));

      u.onend = () => {
        this.zone.run(() => {
          this.currentUtterance = null; // Limpa a referência
          speakOne(i + 1);
        });
      };

      u.onerror = (e) => {
        console.error('Erro TTS:', e);
        this.zone.run(() => this.speaking$.next(false));
      };

      u.onboundary = (e: any) => this.zone.run(() => this.boundary$.next(e.charIndex ?? 0));

      this.synth!.speak(u);
    };

    speakOne(0);
  }

  private defaultPtBrVoice(): SpeechSynthesisVoice | undefined {
    const vs = this.voices$.value || [];
    return vs.find(v => v.name.includes('Google') && v.lang.toLowerCase().includes('pt-br'))
      ?? vs.find(v => v.lang.toLowerCase() === 'pt-br')
      ?? vs.find(v => v.lang.toLowerCase().startsWith('pt'))
      ?? vs[0];
  }

  unlockIOS() {
    if (!this.synth) return;
    const u = new SpeechSynthesisUtterance(' ');
    this.synth.speak(u);
    setTimeout(() => this.synth?.cancel(), 100);
  }

  private chunk(t: string): string[] {
    const s = (t || '').replace(/\s+/g, ' ').trim();
    if (s.length <= 180) return [s];
    const parts: string[] = [];
    let buf = '';
    for (const piece of s.split(/(?<=[\.\!\?])\s+/g)) {
      if ((buf + ' ' + piece).length > 220) {
        parts.push(buf);
        buf = piece;
      } else buf = buf ? buf + ' ' + piece : piece;
    }
    if (buf) parts.push(buf);
    return parts;
  }
}
