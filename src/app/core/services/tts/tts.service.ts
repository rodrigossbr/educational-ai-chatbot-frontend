import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TtsService {
  private synth: SpeechSynthesis | null;
  voices$ = new BehaviorSubject<SpeechSynthesisVoice[]>([]);
  speaking$ = new BehaviorSubject<boolean>(false);
  boundary$ = new Subject<number>(); // índice do caractere atual (se quiser destacar)
  rate = 1; // 0.6–1.4 geralmente fica bom

  constructor(@Inject(PLATFORM_ID) pid: object, private zone: NgZone) {
    this.synth = isPlatformBrowser(pid) ? window.speechSynthesis : null;
    if (!this.synth) return;

    const loadVoices = () => {
      const v = this.synth!.getVoices();
      if (v && v.length) this.voices$.next(v);
    };
    // tenta já carregar e também quando o navegador sinalizar
    loadVoices();
    this.synth.addEventListener?.('voiceschanged', loadVoices);
  }

  read(text: string) {
    const voice = this.defaultPtBrVoice();
    this.speak(text, { voice, rate: this.rate, lang: voice?.lang || 'pt-BR' });
  }

  pause()  { this.synth?.pause(); }
  resume() { this.synth?.resume(); }
  cancel() { this.synth?.cancel(); this.speaking$.next(false); }

  /** Lê o texto (divide em partes p/ evitar travar com textos longos) */
  private speak(text: string, opts?: { voice?: SpeechSynthesisVoice; rate?: number; pitch?: number; volume?: number; lang?: string }) {
    this.cancel();
    if (!this.synth) return;
    const chunks = this.chunk(text);
    const speakOne = (i: number) => {
      if (i >= chunks.length) { this.zone.run(() => this.speaking$.next(false)); return; }
      const u = new SpeechSynthesisUtterance(chunks[i]);
      if (opts?.voice) u.voice = opts.voice;
      u.lang   = opts?.lang ?? opts?.voice?.lang ?? 'pt-BR';
      u.rate   = opts?.rate ?? 1;
      u.pitch  = opts?.pitch ?? 1;
      u.volume = opts?.volume ?? 1;

      u.onstart = () => this.zone.run(() => this.speaking$.next(true));
      u.onend   = () => this.zone.run(() => speakOne(i + 1));
      u.onboundary = (e: any) => this.zone.run(() => this.boundary$.next(e.charIndex ?? 0));

      this.synth!.speak(u);
    };
    speakOne(0);
  }

  /** Tenta escolher uma voz pt-BR */
  private defaultPtBrVoice(): SpeechSynthesisVoice | undefined {
    const vs = this.voices$.value || [];
    return vs.find(v => v.lang?.toLowerCase().startsWith('pt-br'))
      ?? vs.find(v => v.lang?.toLowerCase().startsWith?.('pt'))
      ?? vs[0];
  }

  /** Necessário no iOS: chamar uma vez dentro de um clique do usuário */
  unlockIOS() {
    if (!this.synth) return;
    const u = new SpeechSynthesisUtterance(' ');
    this.synth.speak(u); this.synth.cancel();
  }

  private chunk(t: string): string[] {
    const s = (t || '').replace(/\s+/g, ' ').trim();
    if (s.length <= 180) return [s];
    const parts: string[] = [];
    let buf = '';
    for (const piece of s.split(/(?<=[\.\!\?])\s+/g)) {
      if ((buf + ' ' + piece).length > 220) { parts.push(buf); buf = piece; }
      else buf = buf ? buf + ' ' + piece : piece;
    }
    if (buf) parts.push(buf);
    return parts;
  }
}
