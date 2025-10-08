import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global { interface Window { VLibras?: any; __vlibrasInited?: boolean; } }

@Injectable({ providedIn: 'root' })
export class VlibrasService {

  private widgetOpened = false;

  constructor(@Inject(PLATFORM_ID) private pid: object) {}

  async init(): Promise<void> {
    if (!isPlatformBrowser(this.pid)) return;
    if (window.__vlibrasInited) return;
    // se você NÃO colocou o script no index.html, descomente para carregar aqui:
    // await this.loadScript('https://vlibras.gov.br/app/vlibras-plugin.js');
    if (window.VLibras && !window.__vlibrasInited) {
      // new window.VLibras.Widget('https://vlibras.gov.br/app');
      new window.VLibras.Widget({
        rootPath: "https://vlibras.gov.br/app/",
        personalization: 'https://vlibras.gov.br/config/configs.json',
        opacity: 0.75,
        position: 'R',
        avatar: 'hosana'
      });
      window.__vlibrasInited = true;
    }
  }

  public openWidget() {
    if (!this.widgetOpened) {
      this.clickWidget();
      this.widgetOpened = true;
    }
  }

  public closeWidget() {
    if (this.widgetOpened) {
      this.clickWidget();
      this.widgetOpened = false;
    }
  }

  private clickWidget() {
    const btn = document.querySelector('[vw-access-button]') as HTMLElement | null;
    btn?.click(); // abre/fecha o painel do VLibras
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = () => res();
      s.onerror = (e) => rej(e);
      document.body.appendChild(s);
    });
  }
}
