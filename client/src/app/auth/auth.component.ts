import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, ValidationErrors } from '@angular/forms';
import { left, right } from '@popperjs/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent implements OnInit {
  @ViewChild('singIn') btSignIn!: ElementRef;
  @ViewChild('singUp') btSignUp!: ElementRef;
  @ViewChild('logcontainer') container!: ElementRef;
  validPassword = 0
  validEmail = 0
  strongPassword = 0
  user!: {};

  constructor(
    private UserService : UserService
  ) {  }

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  passPattern = '((?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,30})'
  regForm = new FormGroup({
    nom: new FormControl(null, Validators.required),
    passwd: new FormControl(null,Validators.required),
    repasswd: new FormControl(null,Validators.required),
    email: new FormControl(null,Validators.required),

  })

  ngOnInit(): void {
    console.log(this.container);
  }
  checkPass():void {
    this.validPassword = this.regForm.value["passwd"] == this.regForm.value["repasswd"]? 2 : 1
    this.strongPassword = this.regForm.get("passwd")?.status == "VALID"? 2 : 1
    console.log(this.regForm.get("passwd"));


  }
  checkEmail():void {
    this.validEmail = this.regForm.get("email")?.status == "VALID"? 2 : 1
    // console.log(this.regForm.get("email")?.status);
    console.log(this.validEmail, this.validPassword, this.strongPassword);


  }
  rightPanel() {
    this.container.nativeElement.classList.add("right-panel-active");
  }
  leftPanel() {
    this.container.nativeElement.classList.remove("right-panel-active");
  }
  register() {
    console.log(this.regForm.value);

    this.UserService.register(this.regForm.value).subscribe( params => {
      console.log(params);

    })
  }
}
