import {Map} from 'immutable'
export interface IfeaturedBoxComponentProps {

 /**
  * in-line style component
  */
  classes?: any
  
  post: Map<string, any>

  tag?: string

  /**
   * Owner's post avatar
   *
   * @type {string}
   * @memberof IPostComponentProps
   */
  avatar?: string

  /**
   * User full name
   *
   * @type {string}
   * @memberof IPostComponentProps
   */
  fullName?: string

  /**
   * Number of vote on a post
   *
   * @type {number}
   * @memberof IPostComponentProps
   */
  voteCount?: number

  /**
   * Current user is the owner of the post {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPostComponentProps
   */
  isPostOwner?: boolean

  /**
   * Vote a post
   *
   * @memberof IPostComponentProps
   */
  vote?: () => any

  /**
   * Delete a vote on the post
   *
   * @memberof IPostComponentProps
   */
  unvote?: () => any

  /**
   * Delete a post
   *
   * @memberof IPostComponentProps
   */
  delete?: (id: string) => any

  /**
   * Toggle comment disable/enable
   *
   * @memberof IPostComponentProps
   */
  toggleDisableComments?: (status: boolean) => any

  /**
   * Toggle sharing disable/enable
   *
   * @memberof IPostComponentProps
   */
  toggleSharingComments?: (status: boolean) => any

  /**
   * Redirect to {url} route
   *
   * @memberof IPostComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  thumbPath?: any

  authed?: boolean

}
