import {Directive, ElementRef, HostListener, inject, Input} from '@angular/core';
import {TtsService} from '@core/services/tts/tts.service';
import {ChatStorageService} from '@feature/chat/chat.page/storage/chat-storage/chat-storage.service';

@Directive({
  selector: '[appFocusTts]'
})
export class FocusTtsDirective {

  @Input('appFocusTts') selector: string | null = null;

  private keyboardMode = false;

  private chatStorageService: ChatStorageService = inject(ChatStorageService);

  constructor(private host: ElementRef<HTMLElement>, private tts: TtsService) {
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) {
    this.keyboardMode = ev.key === 'Tab';
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    this.keyboardMode = false;
  }

  @HostListener('focusin', ['$event'])
  onFocusIn(ev: FocusEvent) {
    const el = ev.target as HTMLElement;
    if (!el || !this.keyboardMode) return;
    if (this.selector && !el.matches(this.selector)) return;

    const msg = this.describe(el);
    if (msg && this.chatStorageService.getState().selectedMode === 'voice') {
      this.tts.read(msg);
    }
  }

  private describe(el: HTMLElement): string {
    let name = (el.getAttribute('aria-label') || '').trim();

    if (!name) {
      const byId = el.getAttribute('aria-labelledby');
      if (byId) name = byId.split(/\s+/)
        .map(id => document.getElementById(id)?.textContent?.trim() || '')
        .join(' ').trim();
    }

    if (!name) {
      const alt = (el as HTMLImageElement).alt;
      if (alt) name = alt.trim();
    }
    if (!name) name = el.textContent?.trim() || '';

    // tipo/estado
    const tag = el.tagName.toLowerCase();
    const role = el.getAttribute('role') || tag;
    let tipo = '';
    if (role === 'button' || tag === 'button') tipo = 'botão';
    else if (role === 'link' || tag === 'a') tipo = 'link';
    else if (role === 'checkbox') tipo = 'caixa de seleção';

    let estado = '';
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      estado = el.checked ? 'marcado' : 'desmarcado';
    } else if (el.getAttribute('aria-pressed')) {
      estado = el.getAttribute('aria-pressed') === 'true' ? 'pressionado' : 'não pressionado';
    } else if (el.getAttribute('aria-expanded')) {
      estado = el.getAttribute('aria-expanded') === 'true' ? 'expandido' : 'recolhido';
    } else if ((el as any).disabled || el.getAttribute('aria-disabled') === 'true') {
      estado = 'desabilitado';
    }

    return [name || 'sem rótulo', tipo, estado].filter(Boolean).join(', ');
  }
}
