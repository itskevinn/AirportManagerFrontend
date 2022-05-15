import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../data/services/security/auth.service";
import {Subscription} from "rxjs";
import {markFormControlsAsTouched, unsubscribeAllSubscriptions} from "../../../../shared/func/functions";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: string = '';
  loginForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute) {
    this.loginForm = this.buildForm();
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(): void {
    unsubscribeAllSubscriptions(this.subscriptions);
  }

  public login(): void {
    if (this.loginForm.invalid) {
      markFormControlsAsTouched(this.loginForm);
      return;
    }
    let subscription = this.authService
      .login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(r => {
        if (!r.success) {
          this.messageService.add({
            closable: true,
            key: 'gt',
            severity: 'error',
            summary: 'Error',
            'detail': r.message
          });
        }
        this.router.navigate(["/home"]).then(
          r => {
            if (!r) {
              this.messageService.add({
                key: 'gt',
                summary: 'Error',
                severity: 'error',
                detail: "Ha ocurrido un error, intente de nuevo más tarde"
              });
            }
          }
        );
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
