import { Profile } from 'src/core/domain/users/profile'

export interface IProfileHeaderComponentProps {

    /**
     * Profile for current user {true} or not {false}
     *
     * @type {boolean}
     * @memberof IProfileHeaderComponentProps
     */
  isAuthedUser: boolean

  authed: boolean

  city: boolean

  country: boolean

  company: string,

  twitterId: string,

  level: string,

  /**
   * Image cover address
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  banner: string

  /**
   * User full name
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  fullName: string

  /**
   * User tag line
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  tagLine: string

  /**
   * User's avatar address
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  avatar: string

  /**
   * Open edit profile dialog
   *
   * @memberof IProfileHeaderComponentProps
   */
  openEditor?: () => void

  /**
   * Number of user followers
   *
   * @type {number}
   * @memberof IProfileHeaderComponentProps
   */
  followersCount?: number

  /**
   * Number of followings
   * 
   * @type {number} 
   * @memberof IProfileHeaderComponentProps
   */
  followingCount?: number

  website?: string | null | undefined

  /**
   * User identifier
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  userId: string

  userInfo: Profile

  /**
   * Whether edit profile is open
   */
  editProfileOpen?: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  classes?: any
}
