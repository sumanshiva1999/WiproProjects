import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InternetService } from 'src/Services/internet.service';
import { BadRequest } from '../Errors/BadRequest';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  url:string = "http://localhost:8082/app/v1/log-in";

  constructor(private service: InternetService ,private fb: FormBuilder, private router: Router) { }
  
  // Type 1
  form = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required])
  });

  ngOnInit(): void {
  }
  
  // Control Getters
  get email() {
    return (this.form.get("email"));
  }

  get password() {
    return (this.form.get("password"));
  }

  onSubmit(form: any) {
    this.service.post(this.url, form.value)
    .subscribe({

      next: (response) => {
        this.service.currentUser = response;
        this.router.navigate(["/categories"]);
      },
      error: (err) => {
        if(err instanceof BadRequest) {
          alert("Wrong Credentials");
        }
        else throw Error;
      }})
  }

}
