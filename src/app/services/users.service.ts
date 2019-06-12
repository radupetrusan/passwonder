import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  collectionName = 'users';

  constructor(private firestore: AngularFirestore) { }

  createUser(data) {
    return this.firestore
      .collection(this.collectionName)
      .doc(data.username)
      .set({ ...data });
  }

  getUser(name: string, password: string) {
    return this.firestore.collection<User>(this.collectionName, ref => {
      return ref
        .where('username', '==', name)
        .where('password', '==', password);
    });
  }

  userExists(name: string): Promise<boolean> {
    return this.firestore.collection<User>(this.collectionName, ref => {
      return ref
        .where('username', '==', name);
    })
      .valueChanges()
      .pipe(take(1), map(u => {
        if (u.length > 0) {
          return true;
        }

        return false;
      })).toPromise();
  }

  updateUser(data) {
    const inputs = [];
    data.inputs.forEach(i => { inputs.push({ ...i }); });
    data.inputs = [...inputs];
    return this.firestore.collection(this.collectionName).doc(data.username).set({ ...data });
  }
}
