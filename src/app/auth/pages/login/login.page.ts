import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  configs = {
    isSingIn: true,
    action: 'Login',
    actionChange: 'Create account'
  }

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }


  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSingIn = !this.configs.isSingIn;
    const { isSingIn } = this.configs;
    this.configs.action = isSingIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSingIn ? 'Creat account' : 'Alreay have an account';
    !isSingIn ? this.authForm.addControl('name', this.nameControl) : this.authForm.removeControl('name');
  }
  onSubmit(): void {
    console.log('AuthForm', this.authForm.value);
  }
}
