import {User, Profile, OtherProfile} from 'core/domain/users';

/**
 * User service interface
 *
 * @export
 * @interface IUserService
 */
export interface IUserService {
  getUserProfile: (userId: string) => Promise<Profile>;
  getUserOther: (userId: string) => Promise<OtherProfile>;
  updateUserProfile: (userId: string, profile: Profile) => Promise<void>;
  updateUserOtherProfile: (
    userId: string,
    profile: OtherProfile,
  ) => Promise<void>;
  getUsersProfile: (
    userId: string,
    lastUserId?: string,
    page?: number,
    limit?: number,
  ) => Promise<{users: {[userId: string]: Profile}[]; newLastUserId: string}>;
}
