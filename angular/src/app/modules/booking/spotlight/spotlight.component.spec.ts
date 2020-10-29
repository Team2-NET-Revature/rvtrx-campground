import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotlightComponent } from './spotlight.component';
import { Lodging } from 'src/app/data/lodging.model';

describe('SpotlightComponent', () => {
  let component: SpotlightComponent;
  let fixture: ComponentFixture<SpotlightComponent>;

  const testLodgings: Lodging[] = [
    {
      id: 1,
      location: {
        id: '',
        address: {
          id: '',
          city: '',
          postalCode: '',
          country: '',
          stateProvince: '',
          street: '',
        },
        latitude: '',
        longitude: '',
      },
      name: '',
      bathrooms: 1,
      rentals: [
        {
          id: '1',
          lotNumber: '1',
          unit: {
            size: '5x5',
            capacity: 2,
            name: 'tent',
          },
          status: 'available',
          price: 100,
        },
      ],
      reviews: [],
      imageUrls: [],
    },
    {
      id: 1,
      location: {
        id: '',
        address: {
          id: '',
          city: '',
          postalCode: '',
          country: '',
          stateProvince: '',
          street: '',
        },
        latitude: '',
        longitude: '',
      },
      name: '',
      bathrooms: 1,
      rentals: [],
      reviews: [],
      imageUrls: [],
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SpotlightComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have spotlight', () => {
    component.setSpotlight(testLodgings);
    expect(component.selectedLodging).toBe(testLodgings[0]);
  });

  it('should not have spotlight', () => {
    component.setSpotlight(null);
    expect(component.selectedLodging).toBe(null);
  });

  it('should change spotlight', () => {
    spyOn(component, 'setSpotlight');
    component.lodgings = testLodgings;
    component.ngOnChanges();
    expect(component.setSpotlight).toHaveBeenCalled();
  });
});
