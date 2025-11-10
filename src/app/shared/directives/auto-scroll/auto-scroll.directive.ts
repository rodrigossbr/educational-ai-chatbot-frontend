import {Directive, ElementRef, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {auditTime, fromEvent, Subject, takeUntil} from 'rxjs';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appAutoScroll]',
  standalone: true,
  exportAs: 'autoScroll',
})
export class AutoScrollDirective implements OnInit, OnDestroy {
  @Input() bottomThreshold = 32;
  @Input() scrollBehavior: ScrollBehavior = 'smooth';
  @Input() stickOnInit = true;

  private destroy$ = new Subject<void>();
  private mutationObs?: MutationObserver;
  private resizeObs?: ResizeObserver;
  private shouldStick = true; // se o usuário está “colado” no fundo

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;

    this.zone.runOutsideAngular(() => {
      fromEvent(host, 'scroll')
        .pipe(
          map(() => this.isAtBottom(host)),
          auditTime(50),
          takeUntil(this.destroy$)
        )
        .subscribe((atBottom) => (this.shouldStick = atBottom));

      this.mutationObs = new MutationObserver(() => {
        if (this.shouldStick) this.scrollToBottom();
      });
      this.mutationObs.observe(host, { childList: true, subtree: true });

      if ('ResizeObserver' in window) {
        this.resizeObs = new ResizeObserver(() => {
          if (this.shouldStick) this.scrollToBottom();
        });
        this.resizeObs.observe(host);
      }

      if (this.stickOnInit) {
        requestAnimationFrame(() => this.scrollToBottom('auto'));
      }
    });
  }

  public scrollToBottom(behavior: ScrollBehavior | 'auto-smart' = this.scrollBehavior): void {
    const host = this.el.nativeElement;
    const distance = host.scrollHeight - host.clientHeight - host.scrollTop;
    const smartBehavior: ScrollBehavior = behavior === 'auto-smart'
      ? (distance > host.clientHeight * 2 ? 'auto' : this.scrollBehavior)
      : (behavior as ScrollBehavior);

    host.scrollTo({ top: host.scrollHeight, behavior: smartBehavior });
  }

  private isAtBottom(host: HTMLElement): boolean {
    const distance = host.scrollHeight - host.clientHeight - host.scrollTop;
    return distance <= this.bottomThreshold;
  }

  ngOnDestroy(): void {
    this.destroy$.next(); this.destroy$.complete();
    this.mutationObs?.disconnect();
    this.resizeObs?.disconnect();
  }
}
