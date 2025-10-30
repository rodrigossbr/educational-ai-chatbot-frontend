import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Session} from '@core/models/dtos/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiBaseUrl: string = `${environment.baseUrl}/api/session`;

  private httpClient: HttpClient = inject(HttpClient);

  public getSession(): Observable<Session> {
    return this.httpClient.get<Session>(
      `${this.apiBaseUrl}`,
    );
  }
}
