import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Account } from 'data/account.model';
import { Address } from 'data/address.model';
import { Booking } from 'data/booking.model';
import { Payment } from 'data/payment.model';
import { Profile } from 'data/profile.model';
import { Review } from 'data/review.model';
import { stringify } from 'querystring';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'services/account/account.service';
import { BookingService } from 'services/booking/booking.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';
import { ToastrService } from 'ngx-toastr'; // adding ngx-toastr for api service error notifications
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'uic-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: []
})
export class AccountRegisterComponent implements OnInit {
  email : string ='';
  name : string = '';
  DateofBirth ?: string;
  newaccount ?: Account;
  
  
  async init(): Promise<void> {

    

    };

     create(): Account | undefined
    {
      
      if(this.newaccount != undefined)
      { 
        
        this.newaccount.name = this.name;
      }
      return this.newaccount;
    }
  
  constructor() { }

  ngOnInit(): void {
  }


}
