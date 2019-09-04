import moment from 'moment/moment'
import {Map} from 'immutable'
import _ from 'lodash'

// - Import action types
import { VoteActionType } from 'constants/voteActionType'

// - Import domain
import { Vote } from 'src/core/domain/votes'
import { OtherProfile } from 'src/core/domain/users'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as notifyActions from 'store/actions/notifyActions'
import * as postActions from 'store/actions/postActions'
import * as userAction from 'store/actions/userActions'
import * as commentActions from 'store/actions/commentActions'

import { IVoteService } from 'src/core/services/votes'
import { Post } from 'src/core/domain/posts'
import { Comment } from 'src/core/domain/comments'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/socialEngine'
import { ICommentService } from 'src/core/services'

/**
 * Get service providers
 */
const voteService: IVoteService = provider.get<IVoteService>(SocialProviderTypes.VoteService)
const commentService: ICommentService = provider.get<ICommentService>(SocialProviderTypes.CommentService)

/* _____________ CRUD DB _____________ */

export const addVoteComment = (ownerPostId: any, commentId: any, reverse: boolean ) => {
    return (dispatch: any, getState: Function) => {
      
      const state: Map<string, any> = getState()
      let uid: string = state.getIn(['authorize', 'uid'])
      const currentUser = state.getIn(['user', 'info', uid])
      const comment: Map<string, any> = state.getIn(['comment', 'postComments', ownerPostId, commentId])
      let score = Number(comment.get('upvote', 0)) 
      score = reverse ? score - 1 : score + 1

      const votedComment =
         reverse ? comment.set('upvote', score).deleteIn(['upvoted', uid]).toJS() as Comment :
                   comment.set('upvote', score).setIn(['upvoted', uid], true).toJS() as Comment
    
      dispatch(commentActions.updateComment(votedComment))

      return commentService.updateComment(votedComment)
    }
}

export const downVoteComment = (ownerPostId: any, commentId: any, reverse: boolean ) => {
  return (dispatch: any, getState: Function) => {
    
    const state: Map<string, any> = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    const currentUser = state.getIn(['user', 'info', uid])
    const comment: Map<string, any> = state.getIn(['comment', 'postComments', ownerPostId, commentId])
    let score = Number(comment.get('downvote', 0))
    score = reverse ? score - 1 : score + 1
    const votedComment = 
     reverse ? comment.set('downvote', score).deleteIn(['downvoted', uid]).toJS() as Comment :
              comment.set('downvote', score).setIn(['downvoted', uid], true).toJS() as Comment
  
    dispatch(commentActions.updateComment(votedComment))
    return commentService.updateComment(votedComment)
    }
}
/**
 *  Add vote to database
 * @param  {string} postId is the identifier of the post which user vote
 * @param  {string} ownerPostUserId is the identifier of the post owner which user vote
 */
export const dbAddVote = (postId: string,ownerPostUserId: string) => {
  return (dispatch: any, getState: Function) => {

    const state: Map<string, any> = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    const currentUser = state.getIn(['user', 'info', uid])
    const likes =  state.getIn(['user', 'otherInfo', uid, 'likes'])
    const likeCount =  state.getIn(['user', 'otherInfo', uid, 'likeCount'])
    let vote: Vote = {
      postId: postId,
      creationDate: moment().unix(),
      userDisplayName: currentUser.fullName,
      userAvatar: currentUser.avatar,
      userId: uid
    }
    let OtherProfile: OtherProfile 
    if (likes) {
      OtherProfile = {
          likes: [...likes, postId],
          likeCount: likeCount + 1
      }
    } else {
     OtherProfile = {
         likes: [postId],
         likeCount: likeCount + 1
     }
    }
    
    const post: Map<string, any> = state.getIn(['post', 'userPosts', ownerPostUserId, postId])
    const score = Number(post.get('score', 0)) + 1
     const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], true)
    dispatch(postActions.updatePost(votedPost))
    dispatch(userAction.dbUpdateUserOther(OtherProfile))
    
    return voteService.addVote(vote).then((voteKey: string) => {
      if (uid !== ownerPostUserId) {
        dispatch(notifyActions.dbAddNotification(
          {
            description: 'Liked your post.',
            url: `/posts/${ownerPostUserId}/${postId}`,
            notifyRecieverUserId: ownerPostUserId,notifierUserId: uid,
            isSeen: false
          }))
      }

    })
    .catch((error) => {
      const score = post.get('score', 0) - 1
      const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], false)
      dispatch(postActions.updatePost(votedPost))
      dispatch(globalActions.showMessage(error.message))
    })
  }
}

/**
 * Get all votes from database
 */
// export const dbGetVotes = (userId: string, postId: string) => {
//   return (dispatch: any, getState: Function) => {
//     const state: Map<string, any> = getState()
//     let uid: string = state.getIn(['authorize', 'uid'])
//     if (uid) {

//       return voteService
//       .getVotes(postId)
//       .then((postVotes: { [postId: string]: { [voteId: string]: Vote } }) => {
//         dispatch(addVoteList(postVotes))
//         const post: Post = state.getIn(['post', 'userPosts', userId, postId])
//         if (!post) {
//           return
//         }
//         const votes = postVotes[postId]
//         if (votes && Object.keys(votes).length > 0) {
//           post.score = Object.keys(votes).length
//         }
//       })

//     }
//   }
// }

/**
 * Delete a vote from database
 * @param  {string} id of vote
 * @param {string} postId is the identifier of the post which vote belong to
 */
export const dbDeleteVote = (postId: string, ownerPostUserId: string) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any> = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    const post: Map<string, any> = state.getIn(['post', 'userPosts', ownerPostUserId, postId])
    const likes =  state.getIn(['user', 'otherInfo', uid, 'likes'])
    const likesCount =  state.getIn(['user', 'otherInfo', uid, 'likeCount'])

    let OtherProfile: OtherProfile 
    if (likes) {

      OtherProfile = {
          likes: likes.filter((e: string) => {return e !== postId}),
          likeCount: likesCount - 1
      }
    } else {
      OtherProfile = {
         likes: [],
         likeCount: 0
      }
    }

    const score = post.get('score', 0) - 1
    const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], false)
    dispatch(postActions.updatePost(votedPost))
    dispatch(userAction.dbUpdateUserOther(OtherProfile))
    return voteService.deleteVote(uid, postId).then(x => x)
    .catch((error: any) => {
      const score = post.get('score', 0) + 1
      const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], true)
      dispatch(postActions.updatePost(votedPost))
      dispatch(globalActions.showMessage(error.message))
    })
  }
}

/**
 * Add a vote
 * @param {Vote} vote
 */
export const addVote = (vote: Vote) => {
  return { type: VoteActionType.ADD_VOTE, payload: vote }

}

/**
 * delete a vote
 * @param {string} id vote identifier
 * @param {string} postId post identifier which vote on
 */
export const deleteVote = (userId: string, postId: string) => {
  return { type: VoteActionType.DELETE_VOTE, payload: {userId, postId} }

}

/**
 * Ad a list of vote
 * @param {[postId:string]: {[voteId: string]: Vote}} votes a list of vote
 */
export const addVoteList = (votes: {[postId: string]: {[voteId: string]: Vote}}) => {
  return { type: VoteActionType.ADD_VOTE_LIST, payload: votes }

}

/**
 * Clear all data
 */
export const clearAllvotes = () => {
  return { type: VoteActionType.CLEAR_ALL_DATA_VOTE }
}
