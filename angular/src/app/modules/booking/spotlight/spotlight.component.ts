import { Component, Input, OnChanges } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-spotlight',
  templateUrl: './spotlight.component.html',
})
export class SpotlightComponent implements OnChanges {
  @Input() lodgings!: Lodging[] | null;
  selectedLodging: Lodging | null = null;
  spotlight = false;

  ngOnChanges(): void {
    this.setSpotlight(this.lodgings);
  }

  setSpotlight(lodgings: Lodging[] | null): void {
    let temp = 0;
    if (lodgings) {
      for (const lodging of lodgings) {
        if (lodging.rentals.length > temp) {
          temp = lodging.rentals.length;
          this.selectedLodging = lodging;
        }
      }
    }
  }
}
