import { analyzeAndValidateNgModules } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent {
  account$: Observable<Account>;
  address$: Observable<Address>;
  bookings$: Observable<Booking[]>;
  payments$: Observable<Payment[]>;
  profiles$: Observable<Profile[]>;
  reviews$: Observable<Review[]>;
  private readonly id = '-1';
  accountId = this.id;
  email: string;
  // OktaToken : string | null;
  // OkTokenObj: any;

  constructor(
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    editingService: GenericEditingService<Partial<Account>>
  ) {
    // gets token from localstorage

    // const OktaToken = localStorage.getItem('okta-token-storage');
    // const OkTokenObj = JSON.parse(OktaToken as string);
    // this.email = OkTokenObj.idToken.claims.email;

    // returns user associated with the email parsed from the token, currently hard coding email for testing purposes.
    this.email = this.accountService.getToken();
    this.account$ = this.accountService.getEmail(this.email);
    // code for actual production purposes, when posting function is completed.
    // this.account$ = this.accountService.getEmail(this.email);

    // TODO: get only the bookings of this account
    this.bookings$ = this.bookingService.get();

    this.reviews$ = of([
      // Not yet implemented
    ]);
    this.address$ = this.account$.pipe(map((account) => account.address));
    this.payments$ = this.account$.pipe(map((account) => account.payments));
    this.profiles$ = this.account$.pipe(map((account) => account.profiles));

    // Pass initial model to editingService which acts as model for overwriting data coming in
    this.account$.subscribe((e) => editingService.update(e));
    // Register function for Payload release from editing service
    editingService.payloadEmitter.subscribe((val) => this.update(val as Account));
  }

  /**
   * Function registered to the editing service
   */
  private update(payload: Account): void {
    this.accountService.put(payload).subscribe({
      next: (e) => console.log(e),
      error: (e) => console.error(e),
    });
  }
}
