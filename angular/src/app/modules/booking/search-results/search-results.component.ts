import { Component, Input } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { BookingService } from 'services/booking/booking.service';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { AccountService } from 'services/account/account.service';
import { Booking } from 'data/booking.model';
import { Rental } from 'data/rental.model';
import { share, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'uic-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() lodgings!: Lodging[] | null;
  @Input() query!: string;
  reservation: Booking | undefined;
  userClaims?: UserClaims;
  email?: string;

  constructor(
    public oktaAuth: OktaAuthService,
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService
  ) {
    this.getUserInfo();
  }

  averageRating(lodging: Lodging): boolean[] {
    const maxRating = 10;
    const stars = new Array<boolean>(maxRating);

    stars.fill(false, 0, maxRating);

    if (lodging.reviews === null) {
      return stars;
    }

    const ratings = lodging.reviews.map((review) => review.rating);
    const ratingSum = ratings.reduce((a, b) => a + b, 0);

    const avgRating = Math.floor(ratingSum / ratings.length);

    stars.fill(true, maxRating - avgRating, maxRating);

    return stars;
  }

  async getUserInfo(): Promise<void> {
    this.userClaims = await this.oktaAuth.getUser();
    this.email = this.userClaims.email as string;
    console.log(this.email);
  }

  makeReservation(lodging: Lodging, rentalId: number): void {
    const occRes = /(?<=(Occupancy: ))[^,]+/.exec(this.query);
    const dateReg = /\d{4}-\d{2}-\d{2}\s-\s\d{4}-\d{2}-\d{2}/.exec(this.query);
    let dateRes: string[];
    if (dateReg) {
      dateRes = dateReg[0].split(' - ');
    }
    
    const guestsArr: object[] = [];
    
    if (occRes) {
      for (let i = 0; i < +occRes[0]; i++) {
        guestsArr.push({});
      }
    }
    
    // if (this.email) {
      
    // }
    if (this.email) {
      this.accountService.getEmail(this.email).subscribe((res) => {
        console.log(res);
        this.reservation = {
          accountId: +res.id,
          lodgingId: lodging.id,
          guests: guestsArr,
          rentals: [
            {
              lodgingRentalId: rentalId,
            },
          ],
          checkIn: dateRes[0],
          checkOut: dateRes[1],
        };
        this.bookingService.post(this.reservation).subscribe();
      });
    }
  }
}
