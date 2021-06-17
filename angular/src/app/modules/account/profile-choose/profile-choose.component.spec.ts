import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChooseComponent } from './profile-choose.component';

describe('ProfileChooseComponent', () => {
  let component: ProfileChooseComponent;
  let fixture: ComponentFixture<ProfileChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
