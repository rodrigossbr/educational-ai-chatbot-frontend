import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {TtsService} from '@core/services/tts/tts.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private tts = inject(TtsService);

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'libras',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg-icons/libras.svg')
    );
  }

  ngOnInit(): void {
    this.tts.cancel();
  }
}
