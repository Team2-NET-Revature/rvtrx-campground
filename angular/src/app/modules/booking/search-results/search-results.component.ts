import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { Booking } from '../../../data/booking.model';
import { Rental } from '../../../data/rental.model';
import { BookingService } from 'services/booking/booking.service';

@Component({
  selector: 'uic-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  @Input() lodgings!: Lodging[] | null;
  @Input() query!: string;
  reservation: Booking | undefined;
  rentals: Rental[] = [];

  constructor(private readonly bookingService: BookingService) {}

  ngOnChanges(): void {
    this.setRentalsList();
  }

  setRentalsList(): void {
    // Sets list of rentals from list of lodgings, for total rental count summary
    if (this.lodgings !== null) {
      this.lodgings.forEach((thisLodging) => {
        if (thisLodging.rentals !== null) {
          thisLodging.rentals.forEach((thisRental) => {
            this.rentals.push(thisRental);
          });
        }
      });
    }
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

  makeReservation(lodging: Lodging): void {
    this.reservation = {
      id: '1',
      lodgingId: lodging.id,
      guests: [],
      accountEmail: '',
      rentals: [],
      checkIn: new Date().toDateString(),
      checkOut: new Date().toDateString(),
    };
    this.bookingService.post(this.reservation).subscribe();
  }
}
