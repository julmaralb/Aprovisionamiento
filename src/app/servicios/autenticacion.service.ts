import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AutenticacionService {

  constructor() { }

  isAuth() {
    const user = firebase.auth().currentUser;
    if(user) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    firebase.auth().signOut();
  }

}
