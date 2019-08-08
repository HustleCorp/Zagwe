import { Comment } from 'core/domain/comments'
import { Profile } from 'core/domain/users'

export interface ICommentComponentProps {

  /**
   * Comment
   *
   * @type {Comment}
   * @memberof ICommentComponentProps
   */
  comment: Comment
  /**
   * Comment owner
   */
  commentOwner?: Profile

  /**
   * Open profile editor
   *
   * @type {Function}
   * @memberof ICommentComponentProps
   */
  openEditor?: Function

  /**
   * Close comment editor
   *
   * @type {Function}
   * @memberof ICommentComponentProps
   */
  closeEditor?: () => any
  
  /**
   * Has current user upvoted
   * 
   * @type {boolean}
   * @memberof ICommentComponentProps
   */
  currentUserUpvoted?: boolean
  
  /**
   * Has current user downvoted
   * 
   * @type {boolean}
   * @memberof ICommentComponentProps
   */
  currentUserDownVoted?: boolean
  
  /**
   * Current user is comment owner {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICommentComponentProps
   */
  isCommentOwner?: boolean

  /**
   * Current user is post owner {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICommentComponentProps
   */
  isPostOwner: boolean

  isAuthed?: boolean

  /**
   * Update comment
   *
   * @memberof ICommentComponentProps
   */
  update?: (comment: Comment) => any

  /**
   * Delete comment
   *
   * @memberof ICommentComponentProps
   */
  delete?: (id?: string | null, postId?: string) => any
  
  /**
   * Upvote Comment
   * 
   * @type {function}
   * @memberof ICommentComponentProps
   */
  upvoteComment?: (reverse: boolean) => void

  /**
   * DownVote Comment
   * 
   * @type {function}
   * @memberof ICommentComponentProps
   */
  downVoteComment?: (reverse: boolean) => void

  /**
   * Get user profile
   *
   * @memberof ICommentComponentProps
   */
  getUserInfo?: () => void

  /**
   * User full name
   *
   * @type {string}
   * @memberof ICommentComponentProps
   */
  fullName?: string

  /**
   * User avatar address
   *
   * @type {string}
   * @memberof Comment
   */
  avatar?: string

  /**
   * Writing comment on the post is disabled {true} or not false
   *
   * @type {boolean}
   * @memberof ICommentComponentProps
   */
  disableComments?: boolean

  /**
   * Whether comment edit is open
   */
  editorStatus: boolean

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
