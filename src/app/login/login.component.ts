import { Component, OnInit } from '@angular/core';
import { UserLogService } from '../services/user-log.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginStatusGifSource: string = null;
  formType = 'login';

  constructor(private userLogService: UserLogService, private router: Router) { }

  ngOnInit() {
    if (this.userLogService.isAuthenticated()) {
      this.router.navigate(['/home/challenges']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.signupForm = new FormGroup({
      displayName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      photoURL: new FormControl(null, Validators.required)
    });
    this.userLogService.loginStatus.subscribe(status => {
      this.loginStatusGifSource = 'assets/' + status + '.gif'
    });
  }

  onSignup(form: NgForm | FormGroup) {
    if (!this.signupForm.invalid) {
      const newUser = {
        displayName: form.value.displayName,
        email: form.value.email,
        password: form.value.password,
        phoneNumber: form.value.phoneNumber,
        photoURL: form.value.photoURL
        // role: 'user'
      };
      this.userLogService.signNewUserUp(newUser);
    }
  }

  onLogin(form: NgForm | FormGroup) {
    if (!this.loginForm.invalid) {
      const email = form.value.email;
      const password = form.value.password;
      this.userLogService.login(email, password);
    }
  }

}
