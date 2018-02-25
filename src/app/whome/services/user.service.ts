import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id);
  }

  create(user: User) {
    return this.http.post('/api/users', user);
  }

  update(user: User) {
<<<<<<< HEAD
    return this.http.put('/api/users/' + user.ID, user);
=======
    return this.http.put('/api/users/' + user.id, user);
>>>>>>> 8f6b82da0fc8280e950b4c4c25d8194d79615d2b
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }
}
