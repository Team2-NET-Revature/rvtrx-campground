import { BookingRental } from 'data/bookingrental.model';
import { Rental } from '../rental.model';

export const rentals: Rental[] = [
  {
    id: '1',
    lotNumber: '1',
    size: '5x5',
    capacity: 2,
    siteName: 'tent',
    status: 'available',
    price: 100,
  },
  {
    id: '2',
    lotNumber: '2',
    size: '5x5',
    capacity: 5,
    siteName: 'rv',
    status: 'available',
    price: 100,
  },
];

export const rental: BookingRental = {
  lodgingRentalId: 1,
};
