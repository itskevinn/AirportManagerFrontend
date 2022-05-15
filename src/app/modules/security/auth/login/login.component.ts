import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../data/services/security/auth.service";
import {Subscription} from "rxjs";
import {unsubscribeAllSubscriptions} from "../../../../shared/func/functions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    unsubscribeAllSubscriptions(this.subscriptions);
  }

  public login(): void {
    let subscription = this.authService
      .login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(r => {
        if (!r.success) {
          console.log(r);
        }
      })
    this.subscriptions.push(subscription);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
}
