import { waitForAsync, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Observable, of } from 'rxjs';
import { lodgings } from '../../../data/Mocks/lodging.mock';
import { rentals, rental } from '../../../data/Mocks/rental.mock';
import { Account } from "../../../data/account.model";
import { account } from '../../../data/Mocks/account.mock'
import { bookingMock } from '../../../data/Mocks/booking.mock'
import { OktaAuthModule, OktaAuthService, OKTA_CONFIG, UserClaims } from '@okta/okta-angular';
import { environment } from 'environment';
import { Rental } from 'data/rental.model';
import { AccountService } from 'services/account/account.service';


fdescribe('SearchResultsComponent', () => {
  const accountService = jasmine.createSpyObj<AccountService>('AccountService', ['getEmail']);
  accountService.getEmail.and.returnValue(of(account));

  // const reservation = {
  //   accountId: 1,
  //   lodgingId: 1,
  //   guests: [{}],
  //   rentals: [
  //     {
  //       lodgingRentalId: 1,
  //     },
  //   ],
  //   checkIn: "2020-10-10",
  //   checkOut: "2020-10-12",
  // };
  
  const bookingService = jasmine.createSpyObj<BookingService>('BookingService', ['post']);
  bookingService.post.and.returnValue(of(bookingMock[0]));

  // const accountServiceStub = {
  //   getEmail(): Observable<boolean> {
  //     return of(true);
  //   },

  //   put(acct: Account): Observable<Account> {
  //     return of(acct);
  //   },

  //   getToken(): string {
  //     return 'test';
  //   },
  // };

  const oktaAuthServiceMock = {
    getUser(): Promise<UserClaims> {
      const user: UserClaims = {
        sub: '',
        email: 'test',
      };
      return new Promise<UserClaims>((resolve) => {
        return resolve(user);
      });
    },
  };

  const rating: boolean[] = [false, false, false, false, false, false, false, false, false, true];

  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, OktaAuthModule],
        declarations: [SearchResultsComponent],
        providers: [
          { provide: BookingService, useValue: bookingService },
          { provide: OktaAuthService, useValue: oktaAuthServiceMock },
          { provide: AccountService, useValue: accountService },
          {
          provide: OKTA_CONFIG,
          useValue: environment.identity,
          }
      ],
      }).compileComponents();

      TestBed.inject(HttpClient);
      TestBed.inject(HttpTestingController);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    component.lodgings = lodgings;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have rating of', () => {
    expect(component.averageRating(lodgings[0])).toEqual(rating);
  });

  it('should make reservation', () => {
    component.email = "bob@gmail.com"
    fixture.detectChanges();
    component.makeReservation(lodgings[0], 1);
    expect(accountService.getEmail).toHaveBeenCalled();
    expect(bookingService.post).toHaveBeenCalled();
  });
});
