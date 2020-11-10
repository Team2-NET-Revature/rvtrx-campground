import { Component, Input } from '@angular/core';
import { LodgingService } from 'services/lodging/lodging.service';
import { Booking } from '../../../data/booking.model';

@Component({
  selector: 'uic-account-booking',
  templateUrl: './account-booking.component.html',
})
export class AccountBookingComponent {
  @Input() booking!: Booking;
  imageUri = "https://bulma.io/images/placeholders/128x128.png";
  lodgingName = "Placeholder";

  constructor(
    private readonly lodgingService: LodgingService
  ) {}

  ngOnInit(): void {
    this.getImageUriByLodgingId(this.booking.lodgingId);
  }

  getImageUriByLodgingId(id: number): void {
    this.lodgingService.getById(id.toString()).subscribe(
      (lodging) => {
        this.imageUri = (lodging.images && lodging.images.length > 0 ? lodging.images[0].imageUri : "https://bulma.io/images/placeholders/128x128.png");
        this.lodgingName = lodging.name;
      },
      (err) => console.log(err)
    )
  }
}
