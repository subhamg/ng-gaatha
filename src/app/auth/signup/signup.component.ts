import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hideLogin: Boolean = true;
  isLoading = false;

  roles = ['Creator', 'Narrator', 'Production'];

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  login() {
    if (this.hideLogin == false) {
      this.hideLogin = true;
    } else this.hideLogin = false;
  }

  onSignUp(form: NgForm) {
    this.isLoading = true;
    this.authService.createUser(
      form.value.username,
      form.value.email,
      form.value.role,
      form.value.password
    );
    console.log(form.value);
  }
}
