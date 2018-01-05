import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AutenticacionService } from './servicios/autenticacion.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private authService : AutenticacionService, private router : Router) {}
 
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyANVxCrGtmJdzkcQNSxfy_76WdZHl1Rhoo",
      authDomain: "appangular5-b3b93.firebaseapp.com"
    });
  }

  isAuth() {
    return this.authService.isAuth();
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  getUser () {
    return firebase.auth().currentUser;
  }
}
