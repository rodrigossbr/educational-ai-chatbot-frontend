import {inject, Injectable} from '@angular/core';
import {AskChatbootService, AskText, BotMessage, VlibrasService} from '@app/core';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbootService {

  private askChatbootService = inject(AskChatbootService);

  public chatSendText(body: AskText): Observable<BotMessage> {
    return this.askChatbootService.chatSendText(body);
  }
}
