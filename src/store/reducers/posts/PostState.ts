import { Post } from 'src/core/domain/posts'
import { Map } from 'immutable'

/**
 * Post state
 *
 * @export
 * @class PostState
 */
export class PostState {
  
  [key: string]: any
    /**
     * The list of user posts
     *
     * @type {*}
     * @memberof PostState
     */
    userPosts = Map({ })

    /**
     * If user posts are loaded {true} or not {false}
     *
     * @type {Boolean}
     * @memberof PostState
     */
    loaded: Boolean = false  

    likedPosts = Map({ })
    
    following = Map({ })

    politics = Map({ })

    getemegn = Map({ })

    business = Map({})

    teret = Map({ })

    technology = Map({ })
    
    poetry = Map({ })

    other = Map({})

    featuredPosts = Map({})
  /**
   * Stream data storage
   */
   stream?: Map<string, Map<string, any>> = Map({
                                    userPosts : Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    likePosts: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    following: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    politics: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    business: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    getemegn: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    teret: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    technology: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    poetry: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    other: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                          })

  /**
   * Profile posts data storage
   */
  profile?: Map<string, any> = Map({})
}
