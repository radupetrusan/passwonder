import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  collectionName = 'users';

  constructor(private firestore: AngularFirestore) { }

  createUser(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.collectionName)
        .add({ ...data })
        .then(res => { }, err => reject(err));
    });
  }

  getUser(name: string, password: string) {
    return this.firestore.collection<User>(this.collectionName, ref => {
      return ref
        .where('username', '==', name)
        .where('password', '==', password);
    });
  }
}
