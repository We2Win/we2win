import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll () {
    return this.http.get<User[]>('/api');
  }
  getById(id: string) {
    return this.http.get('/api');
  }
  create(user: User) {
    return this.http.post('/api', user);
  }
  update(user: User) {
    return this.http.put('/api', user);
  }
  delete(id: string) {
    return this.http.delete('/api');
  }
  try() {
    return this.http.get('http://ec2-13-124-14-176.ap-northeast-2.compute.amazonaws.com/api/');
  }
}
