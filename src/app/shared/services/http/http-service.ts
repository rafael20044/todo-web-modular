import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  get<T>(
    url: string,
    params?: HttpParams | Record<string, string | number | boolean>,
  ): Observable<T> | null {
    return null;
  }

  post<T>(
    url: string,
    body?: any,
    withCredentials?: boolean,
  ): Observable<T> | null {
    return null;
  }

  put<T>(
    url: string,
    body: any,
  ): Observable<T> | null {
    return null;
  }

  delete(url: string): Observable<void> | null {
    return null;
  }
}
