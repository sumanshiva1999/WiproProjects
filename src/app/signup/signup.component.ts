import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InternetService } from 'src/Services/internet.service';
import { AppError } from '../Errors/AppError';
import { BadRequest } from '../Errors/BadRequest';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  url: string= "http://localhost:8082/app/v1/register-user";
  token: any= {};

  constructor(private service: InternetService ,private fb: FormBuilder) {
    // Type 2
    let form2 = fb.group({
      "email": [],
      "fName": ["", [Validators.required]],
      "lName": ["", [Validators.required]],
      "number": ["", [Validators.required, Validators.minLength(10)]],
      "array": fb.array([])
    })

   }

  // Type 1
  form = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "firstName": new FormControl("", [Validators.required]),
    "secondName": new FormControl("", [Validators.required]),
    // "number": new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    "password": new FormControl("", [Validators.required]),
    "cPassword": new FormControl("", [Validators.required]),
  });

  ngOnInit(): void {
  }
  
  // Control Getters
  get email() {
    return (this.form.get("email"));
  }

  get firstName() {
    return (this.form.get("firstName"));
  }

  get secondName() {
    return (this.form.get("secondName"));
  }

  get number() {
    return (this.form.get("number"));
  }

  get password() {
    return (this.form.get("password"));
  }

  get cPassword() {
    return (this.form.get("cPassword"));
  }

  onSubmit(form: any) {
    this.service.post(this.url, form.value)
    .subscribe ({
      next: (response) => {
        this.token = response;
        console.log("response", response, "token", this.token);
      },
      error: (err: AppError) => {
        console.log(err);
        if(err instanceof BadRequest)
          alert("User with Email Already Exists!!");
        else
          alert("Unknown Error. For details please Check Console.");
      } })
  }

}
