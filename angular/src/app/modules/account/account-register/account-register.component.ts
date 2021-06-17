import { Component, Inject, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Account, createEmptyAccount } from 'data/account.model';
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
import { FormGroup, FormBuilder } from '@angular/forms';
import { address } from 'src/app/data/Mocks/address.mock';
import { payments } from 'src/app/data/Mocks/payment.mock';
import { account } from 'src/app/data/Mocks/account.mock';

@Component({
  selector: 'uic-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: []
})
export class AccountRegisterComponent implements OnInit {
  email: string = 'team2';
  name: string = 'testuser';
  DateofBirth: string = '200000';
  newaccount = createEmptyAccount();

  async init(): Promise<void> {
  };




  AccountForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    public editingService: GenericEditingService<Partial<Account>>,
    private readonly toastrService: ToastrService
  ) {


  }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.AccountForm = this.fb.group({
      email: '',
      address: this.fb.group({
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: ''
      }),
      profile: this.fb.group({
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        dateofbirth: '',
        isactive: true,
        imguri: ''
      }),
      payment: this.fb.group({
        cardname: '',
        cardnumber: '',
        expdate: '',
        securitycode: ''
      })

    })
  }
  create(): void {
    this.newaccount.email = this.AccountForm.controls['email'].value;
    this.newaccount.address.street = this.AccountForm.get(['address', 'street'])!.value;
    this.newaccount.address.city = this.AccountForm.get(['address', 'city'])!.value;
    this.newaccount.address.stateProvince = this.AccountForm.get(['address', 'state'])!.value;
    this.newaccount.address.postalCode = this.AccountForm.get(['address', 'zipcode'])!.value;
    this.newaccount.address.country = this.AccountForm.get(['address', 'country'])!.value;
    this.newaccount.profiles[0].email = this.AccountForm.get(['profile', 'email'])!.value;
    this.newaccount.profiles[0].givenName = this.AccountForm.get(['profile', 'firstname'])!.value;
    this.newaccount.profiles[0].familyName = this.AccountForm.get(['profile', 'lastname'])!.value;
    this.newaccount.profiles[0].phone = this.AccountForm.get(['profile', 'phone'])!.value;
    this.newaccount.profiles[0].dateofbirth = this.AccountForm.get(['profile', 'dateofbirth'])!.value;
    this.newaccount.profiles[0].active = this.AccountForm.get(['profile', 'isactive'])!.value;
    this.newaccount.profiles[0].imageUri = this.AccountForm.get(['profile', 'imguri'])!.value;
    this.newaccount.payments[0].cardName = this.AccountForm.get(['payment', 'cardname'])!.value;
    this.newaccount.payments[0].cardNumber = this.AccountForm.get(['payment', 'cardnumber'])!.value;
    this.newaccount.payments[0].cardExpirationDate = this.AccountForm.get(['payment', 'expdate'])!.value;
    this.newaccount.payments[0].securityCode = this.AccountForm.get(['payment', 'securitycode'])!.value;

    var response = this.accountService.post(this.newaccount);
    response.subscribe(
      (e) => this.editingService.update(e),
      (err) => {
        console.log(err);
        this.toastrService.error(`${err.message}`, 'Service Error', {
          disableTimeOut: true,
          positionClass: 'toast-top-center',
        });
      }
    );
    console.log(this.newaccount);
  }
}
