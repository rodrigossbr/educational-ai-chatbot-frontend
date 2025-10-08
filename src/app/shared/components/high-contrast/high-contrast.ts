import {Component, inject} from '@angular/core';
import {ThemeEnum, ThemeService, UniqueIdService} from '@app/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-high-contrast',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './high-contrast.html',
  styleUrl: './high-contrast.scss'
})
export class HighContrast {
  protected contrastButtonId!: string;
  protected contrastLabel: 'Alto contraste'| 'Tema padrão' = 'Alto contraste';
  protected selectedTheme: ThemeEnum = ThemeEnum.defaultTheme;

  private themeService: ThemeService = inject(ThemeService);

  constructor(uniqueIdService: UniqueIdService) {
    this.contrastButtonId =
      uniqueIdService.generateUniqueIdWithPrefix('contrast-button');
  }

  protected contrastChange(): void {
    if (this.selectedTheme == ThemeEnum.defaultTheme) {
      this.selectedTheme = ThemeEnum.highContrast;
      this.contrastLabel = 'Alto contraste';
    } else {
      this.selectedTheme = ThemeEnum.defaultTheme;
      this.contrastLabel = 'Tema padrão';
    }

    this.themeService.setTheme(this.selectedTheme);
  }
}
