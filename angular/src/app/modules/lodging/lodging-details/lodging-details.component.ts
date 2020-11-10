import { Component, OnInit } from '@angular/core';
import { Lodging } from '../../../data/lodging.model';
import { ActivatedRoute } from '@angular/router';
import { LodgingService } from '../../../services/lodging/lodging.service';
import { Review } from 'data/review.model';
import { Profile } from 'data/profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'services/booking/booking.service';
import { OktaAuthService } from '@okta/okta-angular';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'uic-lodging-details',
  templateUrl: './lodging-details.component.html',
})
export class LodgingDetailsComponent implements OnInit {
  /**
   * fields used in this component
   */
  lodging: Lodging | null = null;
  profile: Profile;
  Comment: FormGroup;
  hasBooked = false;
  accountId = '0';

  /**
   * provide activated route to get route parameters and lodging service to get lodging
   * @param route route gives access to URL where the component will be displayed
   * @param lodgingService service that requests lodging information
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly lodgingService: LodgingService,
    private readonly bookingService: BookingService,
    private readonly accountService: AccountService,
    private readonly oktaService: OktaAuthService
  ) {
    this.Comment = new FormGroup({
      score: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });

    // Populating the profile with dummy data
    this.profile = {
      id: 1,
      email: 'Email@email.com',
      type: 'adult',
      givenName: 'Guy',
      familyName: 'Ferri',
      phone: '111-111-1111',
    };
  }

  /**
   * On init, get the lodging for which the details will be displayed
   */
  ngOnInit(): void {
    this.getLodgingById();
    this.getUserData();
  }

  /**
   * Gets the user's profile and sets it equal to the current profile
   * Also Sees if the account ID is the same as the lodging ID to allow the user to comment
   */
  getUserData(): void {
    // This gets the users account email from okta
    // This assumes that the account email is the same as the profile email
    // This will need to be changed later
    this.oktaService
      .getUser()
      .then((p) => {
        if (p.email) {
          this.profile.email = p.email;
        }
      })
      .then(() => {
        this.getProfileByEmail(this.profile.email);
      })
      .then(() => {
        this.getBookingByAccountId(this.accountId);
      });
  }

  /**
   * See if the account ID is the same as the lodging ID to allow the user to comment
   */
  getBookingByAccountId(id: string): void {
    this.bookingService.get(id).subscribe(
      (i) => {
        for (const index of i) {
          if (index.accountId === this.accountId && this.lodging?.id === index.lodgingId) {
            this.hasBooked = true;
          }
        }
      },
      (err) => console.log(err)
    );
  }

  /**
   * get user's profile by their account email
   */
  getProfileByEmail(email: string): void {
    // This assumes that the first profile is the profile the user is currently logged in as
    // This will need to be changed later
    this.accountService.getEmail(email).subscribe((p) => {
      this.profile.id = p.profiles[0].id;
      this.profile.familyName = p.profiles[0].familyName;
      this.profile.givenName = p.profiles[0].givenName;
      this.profile.phone = p.profiles[0].phone;
      this.profile.type = p.profiles[0].type;
      this.accountId = p.id;
    });
  }

  /**
   * get lodging by id based on the route /lodging/details/{id}
   */
  getLodgingById(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      if (idString) {
        this.lodgingService.getById(idString).subscribe((data) => {
          this.lodging = data;
          console.log(this.lodging);
          this.lodgingService.getImages(idString).subscribe((urls) => {
            if (this.lodging != null) {
              this.lodging.imageUrls = urls;
            }
          });
        });
      }
    });
  }

  /*
   * Posts the user's comment on the lodging details page
   */
  OnSubmit(): void {
    // Make a new review obj
    let review: Review;

    // Filling the review obj with user submitted data
    if (this.lodging?.id) {
      review = {
        accountId: this.profile.id,
        comment: this.Comment.get('message')?.value,
        dateCreated: new Date().toUTCString(),
        rating: this.Comment.get('score')?.value,
        name: `${this.profile.givenName} ${this.profile.familyName}`,
        lodgingId: this.lodging?.id,
      };
    } else {
      review = {
        accountId: 0,
        name: '',
        comment: '',
        dateCreated: '',
        rating: 0,
        lodgingId: 0,
      };
    }

    // Adds the review to lodging reviews array
    this.lodging?.reviews.push(review);

    this.lodgingService.postReview(review).subscribe(
      (r) => console.log(r),
      (err) => console.log(err)
    );
  }
}
