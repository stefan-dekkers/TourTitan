import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'libs/tourtitan/auth/src/lib/auth.service';

@Component({
  selector: 'cm-nx-workshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log('poging inloggen met userdata: ',this.loginForm.value); // Debugging
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { emailAddress, password } = this.loginForm.value;
    this.authService.login(emailAddress, password).subscribe({
      next: (user) => {
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        // Display the error message from the service
        //console.log(this.errorMessage);
        this.errorMessage = error.message;
      },
    });
  }
}
