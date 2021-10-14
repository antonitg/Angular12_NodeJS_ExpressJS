import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { left, right } from '@popperjs/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent implements OnInit, OnChanges {
  @ViewChild('singIn') btSignIn!: ElementRef;
  @ViewChild('singUp') btSignUp!: ElementRef;
  @ViewChild('logcontainer') container!: ElementRef;

  validPassword = false
  user!: {};

  constructor(
    private UserService : UserService
  ) {  }


  regForm = new FormGroup({
    nom: new FormControl(null, Validators.required),
    passwd: new FormControl(null,Validators.required),
    repasswd: new FormControl(null,Validators.required),
    email: new FormControl(null,Validators.required),


  })

  ngOnInit(): void {
    console.log(this.container);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    this.checkPass()
    console.log(this.validPassword);


  }
  checkPass():void {
    this.validPassword = this.regForm.value["regPass"] == this.regForm.value["regPass2"]? true : false

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
