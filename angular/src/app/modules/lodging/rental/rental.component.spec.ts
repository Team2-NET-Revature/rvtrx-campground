import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalComponent } from './rental.component';
import { Rental } from 'src/app/data/rental.model';
import { rentals } from '../../../data/Mocks/rental.mock';

describe('RentalComponent', () => {
  let component: RentalComponent;
  let fixture: ComponentFixture<RentalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RentalComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RentalComponent);
      component = fixture.componentInstance;
      component.rentals = rentals;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the length of the rows', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);
  });

  it('should test the table headers', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    const headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toContain('Site');
    expect(headerRow.cells[2].innerHTML).toContain('Capacity');
  });

  it('should add and remove rental', () => {
    const rental: Rental = {
      id: '3',
      lotNumber: '3',
      size: '5x5',
      capacity: 2,
      siteName: 'tent',
      status: 'available',
      price: 100,
    };
  });
});
