import { Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  registerForm: FormGroup;
  errorMessages = {
    emptyUsernameError: 'Please enter a username!',
    tooLongUsernameError: 'Username is too long! Max 12 character!',
    emptyEmailError: 'Please enter an E-mail address!',
    emptyPasswordError: 'Please enter a password!',
    tooLongPasswordError: 'Password is too long! Max 32 characters!'
  };
  private registerSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public ngZone: NgZone,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  onSubmit() {
    const user: User = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.ngZone.run(() => {
      if (this.registerForm.valid) {
        this.registerSub = from(this.authService.signUp(user))
          .pipe(
            map(result => {
              return result.user.uid;
            }),
            switchMap(uid => {
              user.uid = uid;
              return this.userService.saveUser(user);
            })
          )
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      }
    });
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      username: this.initUsernameField(),
      email: this.initEmailField(),
      password: this.initPasswordField()
    });
  }

  private initUsernameField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(4), Validators.maxLength(12)]
    ];
  }

  private initEmailField(): any {
    return [null, [Validators.required, Validators.email]];
  }

  private initPasswordField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(6), Validators.maxLength(32)]
    ];
  }
}
