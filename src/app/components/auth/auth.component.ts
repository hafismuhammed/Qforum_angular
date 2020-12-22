import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  errorMessage: any = null;
  signupMessage: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
  }

  submitAuthForm(data) {
    console.log(data);
    if(this.isLoginMode) {
      this.authService.logIn(data.name, data.email)
      .subscribe(
        (res) => {
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error.errors;
          
        }
      )
    } else {
      this.authService.signUp(data.name, data.email, data.password, data.password_confirmation)
      .subscribe(
        (res) => {
          this.isLoginMode = true;
          this.signupMessage = "Signup succesfull login here"
        },
        (err) => {
          this.errorMessage = err.error.errors; 
          console.log(err);       
        }
      );
    }
  } 
}
