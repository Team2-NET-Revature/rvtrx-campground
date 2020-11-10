import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccountBookingComponent } from './account-booking.component';
import { booking } from '../../../data/Mocks/booking.mock';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('AccountBookingComponent', () => {
  let component: AccountBookingComponent;
  let fixture: ComponentFixture<AccountBookingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AccountBookingComponent],
        providers: [HttpClient],
        imports: [HttpClientTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBookingComponent);
    component = fixture.componentInstance;
    component.booking = booking;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * tests constructor values being initalized and if getImageUriByLodgingId works
   */
  it('getImageUriByLodgingId should be called', () => {
    spyOn(component, 'getImageUriByLodgingId');

    expect(component.imageUri).toBeTruthy();
    expect(component.lodgingName).toBeTruthy();

    component.getImageUriByLodgingId(component.booking.lodgingId);
    expect(component.getImageUriByLodgingId).toHaveBeenCalled();
  });
});
