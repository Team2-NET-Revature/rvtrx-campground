import { RentalUnit } from './rental-unit.model';
/**
 * Represents the _Rental_ modei
 *
 * ```yaml
 * id: string;
 * lotNumber: string;
 * unit: RentalUnit;
 * status: string;
 * price: number;
 * discountedPrice?: number;
 * ```
 */
export interface Rental {
  id: string;
  lotNumber: string;
  /** type of site
   *  - plotSize
   *    - an interface that is used to find out the size of a plot
   *      ```yaml
   *      width:number
   *      height:number
   *      ```
   *  - amenities
   *    - an interface that talks about what the campsite offers the camper
   *      ```yaml
   *      maxiumumCapacity:number
   *      voltage:number
   *      sewage:string
   *      water:string
   *      ```
   */
  unit: RentalUnit;
  /** booking status, one of:
   *  - available (neither booked nor currently in use)
   *  - booked (booked by someone else, but not in use)
   *  - occupied (currently in use)
   */
  status: string;
  /** normal nightly cost */
  price: number;
  /** discounted cost, if applicable */
  discountedPrice?: number;
  lodgingRentalId?: number;
}
