import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(ID: string, Password: string) {
    return this.http.post<User>('/api/login', {ID, Password})
      // this is just the HTTP call,
      // we still need to handle the reception of the token

      // shareReplay() to prevent the receiver of this Observable
      // from accidentally triggering multiple POST requests due to
      // multiple subscriptions.
      .shareReplay();
  }
}
