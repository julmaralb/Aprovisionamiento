import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router'
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userdata: any;
  nomail: boolean = false;
  nopass: boolean = false;
  noconnect: boolean = false;

  constructor(private lf: FormBuilder, private router: Router, private authService : AutenticacionService) { }

  ngOnInit() {
    this.loginForm = this.lf.group(
      {
        'email': ['', Validators.required],
        'password': ['', Validators.required],
      }
    );
  }

  onSubmit() {
    this.userdata = this.saveUserData();
    // firebase.auth().signInWithEmailAndPassword(this.userdata.email, this.userdata.password).then(res => {
    //   this.router.navigate(['/']);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(res => {
      this.router.navigate(['/']);
      return firebase.auth().signInWithEmailAndPassword(this.userdata.email, this.userdata.password);
    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/user-not-found') {
        this.nomail = true;
        this.nopass = false;
      } else if (errorCode == 'auth/wrong-password') {
        this.nopass = true;
        this.nomail = false;
      } else {
        this.noconnect = true;
        console.log(errorMessage);
      }
    });
  }

  saveUserData() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    return saveUserdata;
  }

  isAuth() {
    return this.authService.isAuth();
  }


}
