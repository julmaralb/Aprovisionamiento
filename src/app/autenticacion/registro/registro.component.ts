import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  userdata: any;
  emailUsed : boolean = false;

  constructor(private rf: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registroForm = this.rf.group(
      {
        'email' : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        'password' : ['',[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-z0-9]+)$')]],
        'confirm' : ''
      }
    );
  }

  onSubmit() {
    this.userdata = this.saveUserData();
    firebase.auth().createUserWithEmailAndPassword(this.userdata.email, this.userdata.password).then(res => {
      this.router.navigate(['/']);
      
    }).catch(error =>{
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode == 'auth/email-already-in-use'){
        this.emailUsed = true;
      } else {
        console.log(errorMessage);
      }
    });
  }

  saveUserData() {
    const saveUserdata = {
      email: this.registroForm.get('email').value,
      password : this.registroForm.get('password').value
    }
    return saveUserdata;
  }

}
