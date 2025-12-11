import {Component, inject, OnInit} from '@angular/core';
import {ThemeEnum, ThemeService, UniqueIdService} from '@app/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ChatStorageService} from '@feature/chat/chat.page/storage/chat-storage/chat-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-high-contrast',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './high-contrast.html',
  styleUrl: './high-contrast.scss'
})
export class HighContrast implements OnInit {
  protected contrastButtonId!: string;
  protected contrastLabel: 'Alto contraste' | 'Tema padrão' = 'Alto contraste';
  protected selectedTheme: ThemeEnum = ThemeEnum.defaultTheme;

  private subscription: Subscription = new Subscription();

  private themeService: ThemeService = inject(ThemeService);
  private chatStorageService = inject(ChatStorageService);

  constructor(uniqueIdService: UniqueIdService) {
    this.contrastButtonId =
      uniqueIdService.generateUniqueIdWithPrefix('contrast-button');
  }

  ngOnInit(): void {
    this.subscription.add(
      this.chatStorageService.state$.subscribe((state) => {
        const newTheme = state?.chatMode.highContrastEnabled
          ? ThemeEnum.highContrast
          : ThemeEnum.defaultTheme;
        this.changeTheme(newTheme);
      })
    );
  }

  protected get btnPressed() {
    return this.selectedTheme == ThemeEnum.highContrast;
  }

  protected contrastChange(): void {
    if (this.selectedTheme == ThemeEnum.defaultTheme) {
      this.changeTheme(ThemeEnum.highContrast);
    } else {
      this.changeTheme(ThemeEnum.defaultTheme);
    }
  }

  private changeTheme(newTheme: ThemeEnum) {
    this.selectedTheme = newTheme;
    if (newTheme == ThemeEnum.defaultTheme) {
      this.contrastLabel = 'Tema padrão';
    } else {
      this.contrastLabel = 'Alto contraste';
    }

    this.themeService.setTheme(this.selectedTheme);

    const chatMode = this.chatStorageService.getState().chatMode;
    this.chatStorageService.updatePartialState({
      chatMode: {
        ...chatMode,
        highContrastEnabled: this.selectedTheme == ThemeEnum.highContrast
      }
    }, {emit: false});
  }
}
