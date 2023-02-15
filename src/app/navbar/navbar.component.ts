import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input("userName") userName= "";
  @Output("navClick") navClick= new HostListener("click");

  constructor() { }

  ngOnInit(): void {
    console.log("nav oninit");
    console.log("nav", this.userName);
  }

}
