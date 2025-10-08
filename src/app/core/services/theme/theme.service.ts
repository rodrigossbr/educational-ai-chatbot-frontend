import {DOCUMENT, Inject, Injectable} from '@angular/core';
import {ThemeEnum} from '@app/core';
import {ObjectUtils} from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public constructor(@Inject(DOCUMENT) private document: Document) {}

  public setTheme(theme: ThemeEnum): void {
    this.removeAll();
    this.document.body.classList.add(theme);
  }

  private removeAll(): void {
    ObjectUtils.getEnumValues(ThemeEnum).forEach((value) => {
      this.document.body.classList.remove(value);
    });
  }
}
