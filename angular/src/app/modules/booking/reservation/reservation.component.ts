import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'data/booking.model';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { BookingService } from 'services/booking/booking.service';

@Component({
  selector: 'uic-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  booking$: Observable<Booking | undefined>;

  constructor(private route: ActivatedRoute, bookingService: BookingService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.booking$ = bookingService.get(id?.toString()).pipe(map((b) => b.pop()));
  }

  ngOnInit(): void {}
}
