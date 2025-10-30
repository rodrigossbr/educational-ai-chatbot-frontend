import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {Feedback} from '@app/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiBaseUrl: string = `${environment.baseUrl}/api/feedback`;

  private httpClient: HttpClient = inject(HttpClient);

  public sendFeedback(body: Feedback): Observable<Feedback> {
    return this.httpClient.post<Feedback>(
      `${this.apiBaseUrl}`,
      body,
    );
  }
}
