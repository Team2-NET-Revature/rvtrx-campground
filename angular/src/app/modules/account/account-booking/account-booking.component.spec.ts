import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccountBookingComponent } from './account-booking.component';
import { booking } from '../../../data/Mocks/booking.mock';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { lodging } from '../../../data/Mocks/lodging.mock';
import { Observable, of } from 'rxjs';
import { Lodging } from 'data/lodging.model';
import { LodgingService } from 'services/lodging/lodging.service';
describe('AccountBookingComponent', () => {
  let component: AccountBookingComponent;
  let fixture: ComponentFixture<AccountBookingComponent>;

  beforeEach(
    waitForAsync(() => {
      const lodgingServiceStub = {
        getById(id: string): Observable<Lodging> {
          return of(lodging);
        },
      };

      TestBed.configureTestingModule({
        declarations: [AccountBookingComponent],
        providers: [HttpClient, { provide: LodgingService, useValue: lodgingServiceStub }],
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

    component.getImageUriByLodgingId(lodging.entityId);
    expect(component.getImageUriByLodgingId).toHaveBeenCalled();
    expect(component.imageUri).toEqual('https://bulma.io/images/placeholders/128x128.png');
    expect(component.lodgingName).toEqual('test');
  });
});
