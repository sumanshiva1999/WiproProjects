import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from 'src/Models/login-user';
import { SignupUser } from 'src/Models/signup-model';
import { InternetService } from './internet.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private service: InternetService) { }

  
}
