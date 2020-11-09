import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { Lodging } from 'src/app/data/lodging.model';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingService } from 'src/app/services/booking/booking.service';
import { of } from 'rxjs';
import { lodgings } from '../../../data/Mocks/lodging.mock';
import { Rental } from 'data/rental.model';

describe('SearchResultsComponent', () => {
  const bookingService = jasmine.createSpyObj('BookingService', ['post']);
  bookingService.post.and.returnValue(of(true));

  const rating: boolean[] = [false, false, false, false, false, false, false, false, false, true];

  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SearchResultsComponent],
        providers: [{ provide: BookingService, useValue: bookingService }],
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

  it('ngOnChanges should make rentals list', () => {
    component.ngOnChanges();
    expect(component.rentals).toBeTruthy();
    expect(component.rentals.length).toBeTruthy();
    expect(component.rentals[0].status).toEqual('available');
  });

  it('ngOnChanges should display rentals list', () => {
    component.ngOnChanges();
    const testRental: Rental = component.rentals[0];
    const testRentalPriceString = ' $' + testRental.price + ' ';
    const info = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(info).toBeTruthy();
    expect(info[1].textContent).toEqual(testRentalPriceString);
  });

  it('should have rating of', () => {
    expect(component.averageRating(lodgings[0])).toEqual(rating);
  });

  it('should make reservation', () => {
    component.makeReservation(lodgings[0]);
    expect(bookingService.post).toHaveBeenCalled();
  });
});
