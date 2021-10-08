import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { left, right } from '@popperjs/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent implements OnInit {
  @ViewChild('singIn') btSignIn!: ElementRef;
  @ViewChild('singUp') btSignUp!: ElementRef;
  @ViewChild('logcontainer') container!: ElementRef;
  regForm: FormGroup;
  logForm: FormGroup;
  authForm: FormGroup;


  constructor(

    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.regForm = this.fb.group({
      'regEmail' : ['', Validators.required],
      'regPass' : ['', Validators.required],
      'regUser' : ['', Validators.required]
    })
    this.logForm = this.fb.group({
      'logEmail': ['', Validators.required],
      'logPass': ['', Validators.required],
    })

  }

  ngOnInit(): void {
    console.log(this.container);
  }

  rightPanel() {
    this.container.nativeElement.classList.add("right-panel-active");
  }
  leftPanel() {
    this.container.nativeElement.classList.remove("right-panel-active");
  }
}
