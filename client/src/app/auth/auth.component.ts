import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { left, right } from '@popperjs/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent implements OnInit, OnChanges {
  @ViewChild('singIn') btSignIn!: ElementRef;
  @ViewChild('singUp') btSignUp!: ElementRef;
  @ViewChild('logcontainer') container!: ElementRef;

  validPassword = false

  constructor(
  ) {  }


  regForm = new FormGroup({
    regEmail: new FormControl(null, Validators.required),
    regUser: new FormControl(null,Validators.required),
    regPass: new FormControl(null,Validators.required),
    regPass2: new FormControl("null",Validators.required),


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
}
