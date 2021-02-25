import { Address } from './address.model';
import { Payment } from './payment.model';
import { Profile } from './profile.model';

/**
 * Represents the _Account_ model
 *
 * ```yaml
 * id?: string;
 * entityId: string;
 * email: string;
 * address: Address;
 * payments: Payment[];
 * profiles: Profile[];
 * ```
 */
export interface Account {
  id: string;
  entityId: string;
  address: Address;
  name: string;
  email: string;
  payments: Payment[];
  profiles: Profile[];
}
