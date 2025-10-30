import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AskText, BotMessage} from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class AskChatbootService {

  private apiBaseUrl: string = `${environment.baseUrl}/api`;

  private httpClient: HttpClient = inject(HttpClient);

  public chatSendText(body: AskText): Observable<BotMessage> {
    return this.httpClient.post<BotMessage>(
      `${this.apiBaseUrl}/chat`,
      body,
    );
  }
}
