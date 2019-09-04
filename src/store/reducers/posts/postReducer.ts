// - Import react components
import _ from 'lodash'
import { Map, fromJS } from 'immutable'

// - Import action types
import { PostActionType } from 'constants/postActionType'

import { PostState } from './PostState'
import { IPostAction } from './IPostAction'

const updatePost = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostOwnerId = post.get('ownerUserId')
  const updatePostId = post.get('id')
  return state
      .setIn(['userPosts', updatePostOwnerId, updatePostId], Map(post))
}

const updatePostComments = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostOwnerId = post.get('ownerUserId')
  const updatePostId = post.get('id')
  return state
      .setIn(['userPosts', updatePostOwnerId, updatePostId, 'comments'], post.get('comments'))
}

const updatePostVotes = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostOwnerId = post.get('ownerUserId')
  const updatePostId = post.get('id')
  return state
      .setIn(['userPosts', updatePostOwnerId, updatePostId, 'votes'],  post.get('votes'))
}

/**
 * Post reducer
 * @param {object} state
 * @param {object} action
 */
export let postReducer = (state = Map(new PostState()), action: IPostAction) => {
  const { payload } = action
  switch (action.type) {
    case PostActionType.CLEAR_ALL_DATA_POST:
      return Map(new PostState())

    case PostActionType.ADD_IMAGE_POST:
      return state
        .setIn(['userPosts', payload.uid, payload.post.id], Map(payload.post))

    case PostActionType.ADD_POST:
      return state
        .setIn(['userPosts', payload.uid, payload.post.id], fromJS({...payload.post}))
    case PostActionType.ADD_BODY_POST:
        return state
           .mergeDeepIn(['userPosts', payload.uid, payload.post.id], fromJS({...payload.post}))
             
    case PostActionType.ADD_LIKE_POST:
      return state
        .setIn(['likedPosts', payload.post.id], fromJS({...payload.post}))

    case PostActionType.UPDATE_POST: return updatePost(state, payload)
    case PostActionType.UPDATE_POST_COMMENTS: return updatePostComments(state, payload)
    case PostActionType.UPDATE_POST_VOTES: return updatePostVotes(state, payload)

    case PostActionType.DELETE_POST:
      return state
        .deleteIn([payload.tag, payload.uid, payload.id])

    case PostActionType.ADD_LIST_POST:
      return state
        .mergeDeepIn(['userPosts'], payload.userPosts)
        .set('loaded', true)
        // .deleteIn(['userPosts', 'hello'])
    case PostActionType.ADD_TOPIC_POST:
          return state
            .mergeDeepIn([payload.header], payload.followingPosts)
            .set('topicloaded', true)
    case PostActionType.ADD_FEATURED_POST: 
         return state 
               .setIn(['featuredPosts'], payload.featuredPosts)
               .set('featureloaded', true)
    case PostActionType.HAS_MORE_DATA_STREAM:
      return state
        .setIn(['stream', 'hasMoreData'], true)

    case PostActionType.NOT_MORE_DATA_STREAM:
      return state
        .setIn(['stream', payload.type,  'hasMoreData'], false)
    case PostActionType.REST_LAST_POST_ID:
      return state
        .setIn(['stream', payload.type, 'lastPostId' ], '')

    case PostActionType.REQUEST_PAGE_STREAM:
      return state
        .setIn(['stream', 'lastPageRequest'], payload.page)

    case PostActionType.LAST_POST_STREAM:
      return state
        .setIn(['stream', payload.type, 'lastPostId'], payload.lastPostId)

    case PostActionType.HAS_MORE_DATA_PROFILE:
      return state
        .setIn(['profile', 'hasMoreData'], true)

    case PostActionType.NOT_MORE_DATA_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'hasMoreData'], false)

    case PostActionType.REQUEST_PAGE_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'lastPageRequest'], payload.page)

    case PostActionType.LAST_POST_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'lastPostId'], payload.lastPostId)

    default:
      return state

  }
}