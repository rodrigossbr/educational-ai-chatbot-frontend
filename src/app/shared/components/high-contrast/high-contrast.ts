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
        this.selectedTheme = state?.chatMode.highContrastEnabled
          ? ThemeEnum.highContrast
          : ThemeEnum.defaultTheme;
        this.contrastChange();
      })
    );
  }

  protected get btnPressed() {
    return this.selectedTheme == ThemeEnum.highContrast;
  }

  protected contrastChange(): void {
    if (this.selectedTheme == ThemeEnum.defaultTheme) {
      this.selectedTheme = ThemeEnum.highContrast;
      this.contrastLabel = 'Tema padrão';
    } else {
      this.selectedTheme = ThemeEnum.defaultTheme;
      this.contrastLabel = 'Alto contraste';
    }

    this.themeService.setTheme(this.selectedTheme);

    const chatMode = this.chatStorageService.getState().chatMode;
    this.chatStorageService.updatePartialState({
      chatMode: {
        ...chatMode,
        highContrastEnabled: this.selectedTheme == ThemeEnum.highContrast
      }
    }, { emit: false })
  }
}
