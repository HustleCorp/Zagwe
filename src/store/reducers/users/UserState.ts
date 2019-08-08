import { User,Profile } from 'src/core/domain/users'
import { Map, fromJS, List } from 'immutable'

/**
 * User state
 *
 * @export
 * @class UserState
 */
export class UserState {
  [key: string]: any
    /**
     * The list of users information
     */
  info: Map<string,  Profile> = Map({})

  /**
   *  Other information
   */
  otherInfo: Map<string, Profile> = Map({})

    /**
     * If users profile are loaded
     */
  loaded: Boolean = false

    /**
     *  If secondary info has loaded
     */
   otherloaded: Boolean = false

    /**
     * If edit profile is open {true} or not {false}
     */
  openEditProfile: Boolean = false

  /**
   * People data storage
   */
  people?: Map<string, any> = Map({hasMoreData: true, lastPageRequest: -1, lastUserId: ''})
}
