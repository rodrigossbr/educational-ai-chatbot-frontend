import {DestroyRef, Directive, effect, ElementRef, EventEmitter, input, NgZone, Output} from '@angular/core';

@Directive({
  selector: '[appAutoScroll]',
  standalone: true,
  exportAs: 'autoScroll',
})
export class AutoScrollDirective {
  trigger = input<any>(null, { alias: 'appAutoScroll' });
  lock = input<boolean>(false, { alias: 'autoScrollLock' });
  threshold = input<number>(80, { alias: 'autoScrollThreshold' });
  behavior = input<'smooth' | 'auto'>('smooth', { alias: 'autoScrollBehavior' });
  anchor = input<HTMLElement | null>(null, { alias: 'autoScrollAnchor' });

  @Output() autoScrollStuckChange = new EventEmitter<boolean>();

  private stuck = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    destroyRef: DestroyRef
  ) {
    this.zone.runOutsideAngular(() => {
      const onScroll = () => this.updateStuck();
      this.el.nativeElement.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() =>
        this.el.nativeElement.removeEventListener('scroll', onScroll)
      );
    });

    effect(() => {
      void this.trigger();
      const lock = this.lock();
      if (lock || this.isNearBottom()) this.scrollToEnd();
    });
  }

  jumpToEnd() { this.scrollToEnd(); }

  private isNearBottom(): boolean {
    const el = this.el.nativeElement;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    return remaining < this.threshold();
  }

  private updateStuck() {
    const nowStuck = !this.isNearBottom();
    if (nowStuck !== this.stuck) {
      this.stuck = nowStuck;
      this.autoScrollStuckChange.emit(this.stuck);
    }
  }

  private scrollToEnd() {
    const el = this.el.nativeElement;
    const anchor = this.anchor();
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        if (anchor) {
          anchor.scrollIntoView({ block: 'end', behavior: this.behavior() });
        } else {
          el.scrollTo({ top: el.scrollHeight, behavior: this.behavior() });
        }
        this.updateStuck();
      });
    });
  }
}
