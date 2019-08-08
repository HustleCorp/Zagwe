import { Post } from 'core/domain/posts'
export interface ITopicPostComponentProps {

  /**
   * Router match
   *
   * @type {*}
   * @memberof ITopicPostComponentProps
   */
  match?: any
  
  /**
   * User identifier
   *
   * @type {string}
   * @memberof ITopicPostComponentProps
   */
  userId: string
  
  tag?: string

  /**
   * User's post
   *
   * @type {{[postId: string]: Post}}
   * @memberof ITopicPostComponentProps
   */
  posts?: {[postId: string]: Post}

  loadFollowData: any

  loadTopicData: any

  loadDataStream?: () => void

  hasMorePosts: boolean

  mergedPosts: any

  classes: any

}