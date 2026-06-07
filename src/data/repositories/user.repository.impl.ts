import { User } from '@/domain/entities/user.entity';
import { UserRepository } from '@/domain/repositories/user.repository';

// We create a mock "in-memory" user since we don't have a real backend for auth yet.
let mockUser: User = {
  id: 'user-123',
  username: 'Hunter',
  email: 'hunter@sololeveling.com',
  preferences: {
    theme: 'dark',
    currency: 'USD',
  },
};

/**
 * Concrete Implementation of the User Repository
 */
export const userRepositoryImpl: UserRepository = {
  getCurrentUser: async (): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUser;
  },

  updatePreferences: async (preferences: Partial<User['preferences']>): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update our mock user
    mockUser = {
      ...mockUser,
      preferences: {
        ...mockUser.preferences,
        ...preferences,
      },
    };
    
    return mockUser;
  },
};
