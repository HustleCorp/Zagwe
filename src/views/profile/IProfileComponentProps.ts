import { Post } from 'src/core/domain/posts'
import { Profile } from 'src/core/domain/users/profile'

export interface IProfileComponentProps {

  /**
   * Router match
   *
   * @type {*}
   * @memberof IProfileComponentProps
   */
  match: any

  /**
   * User's post
   *
   * @type {{[postId: string]: Post}}
   * @memberof IProfileComponentProps
   */
  posts: {[postId: string]: Post}

  likedPosts: {[postId: string]: Post} 

  /**
   * String user full name
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  name: string

  /**
   * User tag line
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  tagLine: string

  /**
   * User email
   * 
   * @type {string}
   * @memberof IProfileComponentProps
   */
  website?: string
  /**
   * User's avatar address
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  avatar: string

  isAuthedEdit?: boolean

  /**
   * It's current user profile {true} or not {false}
   *
   * @type {boolean}
   * @memberof IProfileComponentProps
   */
  authed: boolean

  /**
   * User's banner
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  banner: string

  /**
   * User identifier
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  userId: string

  userProfile?: Profile

  /**
   * Load user's post
   *
   * @memberof IProfileComponentProps
   */
  loadPosts: () => any

  /**
   * Load user's profile
   *
   * @memberof IProfileComponentProps
   */
  loadUserInfo: () => any
  
  /**
   * Load secondary information
   * 
   * @memberof IProfileComponentProps
   */
  loadUserOther: () => any

  /**
   * Load liked posts
   * 
   * @memberof IProfileComponentProps
   */
  loadUserLikePosts: ( ) => any

  /**
   * If there is more posts to show in profile
   */
  hasMorePosts: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any, params?: {}) => any

  classes: any

  tab?: any

  followingCount?: number

  followersCount?: number

  likeCount?: number

  likes: string []
   
  city?: string

  country?: string

}
