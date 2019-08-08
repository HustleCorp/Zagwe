// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Map, List } from 'immutable'
import { NavLink } from 'react-router-dom'

import postPage from 'src/assets/jss/material-kit-react/components/postPage'
import {MenuItem, ListItemIcon, ListItemText} from '@material-ui/core'
import SvgLink from '@material-ui/icons/Link'

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'

// Materil-Ui Components

import Checkbox from '@material-ui/core/Checkbox'
import SvgIcon from '@material-ui/core/SvgIcon'
import IconButton from '@material-ui/core/IconButton'
import UserAvatar from 'components/userAvatar'

import CommentGroup from 'components/commentGroup'
import FollowBox from 'components/FollowButton'
import { IPostPageComponentProps } from './IPostPageComponentProps'
import { IPostPageComponentState } from './IPostPageComponentState'
import { withStyles } from '@material-ui/core'

// Import Actions
import * as commentActions from 'store/actions/commentActions'
import * as voteAction from 'store/actions/voteActions'

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,

} from 'react-share'

/**
 * Create component class
 */
export class PostPageComponent extends Component<IPostPageComponentProps,IPostPageComponentState> {
  
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IPostPageComponentProps) {
      super(props)
      // Default state
      this.state = {

    }

    // Binding functions to `this`
    this.handleVote = this.handleVote.bind(this)
    this.handleCopyLink = this.handleCopyLink.bind(this)

  }

  handleVote = () => {
    if (this.props.currentUserVote) {
      this.props.unvote!()
    } else {
      this.props.vote!()
    }
  }
  /**
   * Show copy link
   *
   */
  handleCopyLink = () => {
    this.setState({
      openCopyLink: true,
      shareTitle: 'Copy Link'
    })
  }
    
  componentWillMount () {
    const { commentList} = this.props
    this.props.loadPost!()
    this.props.loadUserInfo!()
    if (!commentList) {
        this.props.getPostComments!()
    }
  }

  componentDidMount () {
    window.scrollTo(0,0)
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const {classes, post, tagline, commentList, userId, userInfo, authed,  isPostOwner} = this.props
    const styles = {
      avatar: {
        border: '2px solid rgb(226, 226, 226',
        width: '110px',
        height: '110px',
        fontSize: 'xx-large',

      }
    }
    const { 
      ownerUserId, 
      id, 
      disableComments, 
      commentCounter, 
      disableSharing ,
    } = post.toJS() as any
   
    return (

            <div className={classes.container}> 
               <div className={classes.postContent}>
                   <h3 className={classes.title}>{post.get('title')}</h3>
                    <div className={classes.ownerDisplayName}> 
                     {`Written by ${post.get('ownerDisplayName')}`}</div>

               <div>
                <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: post.get('body') }} /> 
              </div>
              </div>
              <div className={classes.social}>
                <div className={classes.socialInside}>
                  <div className={classes.socialLeft}>
                      <IconButton
                          style={{padding: '0px'}}
                          className={classes.iconButton}
                          onClick={this.handleVote}
                          aria-label='Love'>
                      <Checkbox
                            className={classes.iconButton}
                            checkedIcon={
                            <SvgIcon style={{ fill: '#9c27b0',  stroke: 'black', strokeWidth: '2px' }} 
                            >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z">
                            </path>
                            </SvgIcon>}
                            icon={<SvgIcon style={{ fill: '#fafafa', stroke: 'black', strokeWidth: '2px' }}>
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </SvgIcon>}

                            checked={this.props.currentUserVote}
                            />
                          <div className={classes.voteCounter}> {this.props.voteCount! > 0 ? this.props.voteCount : ''} </div>
                        </IconButton>
                  </div>
                  <div className={classes.socialRight}>
                     <div>
                        <FacebookShareButton
                          url={`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`}
                          quote={post.get('body')}
                          hashtag={post.get('tags', List<string>([])).count() > 0 ?  `#${post.getIn(['tags', 0], 'hashtag') }` : null}
                          >
                          <MenuItem className={classes.menuItem}>
                            <ListItemIcon>
                              <FacebookIcon
                                size={32}
                                round />
                            </ListItemIcon>
                          </MenuItem>
                        </FacebookShareButton>
                      </div>    
                      <div>
                        <TwitterShareButton
                          url={`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`}
                          quote={post.get('body')}
                          hashtag={`#${post.getIn(['tags', 0], '')}`}>
                          <MenuItem className={classes.menuItem}>
                            <ListItemIcon>
                              <TwitterIcon
                                size={32}
                                round />
                            </ListItemIcon>
                          </MenuItem>
                        </TwitterShareButton>
                     </div>
                     <div>
                        <MenuItem style={{paddingLeft: '0px', paddingRight: '0px'}} onClick={this.handleCopyLink} > 
                        <ListItemIcon>  
                          <SvgLink /> 
                        </ListItemIcon>  
                      </MenuItem> 
                      </div>
                  </div>
                </div>
              </div>
              <hr/> 
              <div className={classes.credit}>
               <div className={classes.avatarBio}>
                 <NavLink to={`/${ownerUserId}/posts`}>  
                    <div className={classes.avatar}>
                      <UserAvatar
                      fullName={post.get('ownerDisplayName')} 
                      fileName={post.get('ownerAvatar')} 
                      style={styles.avatar}
                      size={80} />
                      </div>
                  </NavLink>
                    <div className={classes.bio}>
                        <div className={classes.author} >
                        <h4 className={classes.title}>{post.get('ownerDisplayName')}</h4>
                        </div>
                        <div className={classes.tagline}>
                              <h4>
                                {tagline}
                            </h4>
                        </div>
                    </div>
                  </div>
                  <div className={classes.circle}>
                      {/* <Button variant="outlined" size="small" color="primary" className={classes.margin}>
                        <PersonAdd /> Follow
                      </Button> */}
                      <FollowBox authed={authed!} userId={userId!} userInfo={userInfo!} />
                  </div>
              </div> 

              <hr/>
              <div className={classes.comment}>
                <h4 className={classes.title}>
                  Comments
                 </h4>
              </div> 
              <CommentGroup open={true} comments={commentList} ownerPostUserId={ownerUserId!}  isPostOwner={this.props.isPostOwner!} disableComments={disableComments!} postId={id} />
            </div>
    )
  }
}

  /**
   * Map dispatch to props
   * @param  {func} dispatch is the function to dispatch action to reducers
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
const mapDispatchToProps = (dispatch: any, ownProps: IPostPageComponentProps) => {
  const {userId,postId} = ownProps.match.params
  return{
    vote: () => dispatch(voteAction.dbAddVote(postId, userId)),
    unvote: () => dispatch(voteAction.dbDeleteVote(postId, userId)),
    loadPost: () => dispatch(postActions.dbGetPostById(userId,postId)),
    loadUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(userId,'header')),
    getPostComments: () => dispatch(commentActions.dbFetchComments(userId, postId))
  }
}

  /**
   * Map state to props
   * @param  {object} state is the obeject from redux store
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
const mapStateToProps = (state: Map<string, any>, ownProps: IPostPageComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'])
  const authed = state.get
  const {userId, postId} = ownProps.match.params
  const userInfo = state.getIn(['user', 'info', userId])
  let posts: Map<string, any> = Map({})
  posts = posts.set(postId, state.getIn(['post', 'userPosts', userId, postId], Map({})))
  const post = posts.getIn([postId])
  const commentList: { [commentId: string]: Comment } = state.getIn(['comment', 'postComments', postId])
  const currentUserVote = post.getIn(['votes', uid], false)
  const voteCount = post.getIn(['score'], 0)

  return {
    avatar:  userInfo ? userInfo.avatar : '',
    name:  userInfo ? userInfo.fullName : '',
    tagline: userInfo ? userInfo.tagLine : '',
    userInfo: userInfo,
    commentList,
    post: post,
    currentUserVote, 
    voteCount,
    postId,
    userId,
    isPostOwner: uid === userId
  }

}

  // - Connect component to redux store
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(postPage as any)(PostPageComponent as any) as any)
