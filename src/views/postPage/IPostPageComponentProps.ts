import { Post } from 'src/core/domain/posts'
import { Comment } from 'core/domain/comments'
import {Map} from 'immutable'

export interface IPostPageComponentProps {

  /**
   * Load the post
   *
   * @memberof IPostPageComponentProps
   */
  loadPost?: () => any

  loadBodyPost?: () => any

  /**
   * Load user profile
   *
   * @memberof IPostPageComponentProps
   */
  loadUserInfo?: () => any

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
  toggleDisableComments?: (status: boolean, post: Map<string, any>) => any

  /**
   * Route match
   *
   * @type {*}
   * @memberof IPostPageComponentProps
   */
  match?: any

  translate?: any
  
  /**
   * Class object
   * 
   * @type{object}
   * @memberof IP
   */
  classes?: any

  userInfo?: any

  /**
   * UserId od the post writer
   * @type{string}
   * @memeberof IPostPageComponenetProps
   */
  userId?: string
  /**
   * Post Identification
   * 
   * @type{string}
   * @memberof IPostPageComponentProps
   */
  postId?: string

  authorized?: string

  /**
   * Post Map
   * 
   * @type{any}
   * @memberof IPostPageComponentProps
   */
  post: any

  authed?: boolean
  /**
   * Get the comments of a post
   *
   * @memberof IPostComponentProps
   */
  getPostComments?: () => any

  goTo?: (url: string) => any

  /**
   * Vote of a post
   * 
   * @memberof IPostComponentProps
   */
   vote?: () => any

  /**
   * Vote of a post
   * 
   * @memberof IPostComponentProps
   */
   unvote?: () => any

  /**
   * Author Bio
   * 
   * @type{string}
   * @memberof IPostPageComponentProps
   */
  tagline: string

  /**
   * Commnets
   *
   * @type {{[commentId: string]: Comment}}
   * @memberof IPostPageComponenetProps
   */
  commentList?: Map<string, Comment>

  /**
   * Is ownerog the post
   * 
   * @type {boolean}
   * @memberof IPostPageComponenetPropsss
   */
  isPostOwner: boolean

  /**
   * Has current used voted on Post
   * 
   * @type {boolean}
   * @memberof IPostPageComponenetProps
   */
  currentUserVote: boolean

  /**
   * Number of votes
   * 
   * @type {Number}
   * @memberof IPostPageComponenetProps
   * 
   */
  voteCount: Number
}
