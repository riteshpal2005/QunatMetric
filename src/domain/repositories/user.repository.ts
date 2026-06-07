import { User } from '../entities/user.entity';

/**
 * Domain Repository Interface for User
 * 
 * Again, this is a strict contract. It defines WHAT user operations exist.
 * Later, we will write an "Implementation" file that actually fulfills this contract 
 * (e.g., by making an HTTP request to a backend).
 */
export interface UserRepository {
  /**
   * Retrieves the currently logged-in user profile.
   */
  getCurrentUser(): Promise<User>;

  /**
   * Updates the user's local or remote preferences.
   * We use Partial<User['preferences']> because the user might only want to update the theme, not the currency.
   */
  updatePreferences(preferences: Partial<User['preferences']>): Promise<User>;
}
