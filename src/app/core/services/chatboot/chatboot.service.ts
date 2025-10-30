import {inject, Injectable} from '@angular/core';
import {AskChatbootService} from "@app/core/api";
import {AskText, BotMessage} from "@app/core/models";

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbootService {

  private askChatbootService = inject(AskChatbootService);

  public chatSendText(body: AskText): Observable<BotMessage> {
    return this.askChatbootService.chatSendText(body);
  }
}
