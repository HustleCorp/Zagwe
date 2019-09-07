import { Post } from 'src/core/domain/posts'
import { Map } from 'immutable'
import moment from 'moment'
let post: Post = {
  postTypeId: 0,
  creationDate: moment.now(),
  deleteDate: 0,
  score: 0,
  viewCount: 0,
  title: '',
  body: '',
  id: 'fdssdfds',
  bodyText: '',
  postTopic: '',
  ownerUserId: '',
  ownerDisplayName: '',
  ownerAvatar: '',
  image: '',
  thumbImage: '', 
  imageFullPath: '',
  disableComments: false,
}

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

    topicloaded: Boolean = false

    loaded: Boolean = false 

    featureloaded: boolean = false

    likedPosts = Map({ })

    latest = Map({})
    
    following = Map({ })

    politics = Map({ })

    getemegn = Map({ })

    business = Map({})

    culture = Map({})

    teret = Map({ })

    technology = Map({ })
    
    health = Map({})
    
    poetry = Map({ })

    other = Map({})

    featuredPosts = Map({ a : Map({a: post}), b : Map({a: post}), c : Map({a: post}), d : Map({a: post}), e : Map({a: post}), f : Map({a: post}), g : Map({a: post})})
  /**
   * Stream data storage
   */
   stream?: Map<string, Map<string, any>> = Map({
                                    userPosts : Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    likePosts: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    latest: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    following: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    politics: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    business: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    culture: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    getemegn: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
                                    health: Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''}),
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
