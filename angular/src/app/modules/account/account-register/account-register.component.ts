import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uic-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: []
})
export class AccountRegisterComponent implements OnInit {
  email?: string;
  name?: string;
  DateofBirth?: string;


  constructor() { }

  ngOnInit(): void {
  }


}
