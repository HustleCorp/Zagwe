// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { push } from 'connected-react-router'
import moment from 'moment/moment'
import copy from 'copy-to-clipboard'
import { getTranslate } from 'react-localize-redux'
import { Map } from 'immutable'
import * as R from 'ramda'
import notifier from "simple-react-notifications"

// - Material UI
import SvgIcon from '@material-ui/core/SvgIcon'
import Comment from '@material-ui/icons/ModeCommentOutlined'
import Card from 'StyledComponents/Card/Card.jsx'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import SvgShare from '@material-ui/icons/Share'  

import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { withStyles } from '@material-ui/core/styles'
import PostPreview from 'assets/jss/material-kit-react/components/postComponent.jsx'

import ShareDialog from 'components/shareDialog'
import Img from 'components/img'
import UserAvatar from 'components/userAvatar'
import * as AdminAPi from 'api/adminAPi'

// - Import actions
import * as voteActions from 'store/actions/voteActions'
import * as postActions from 'store/actions/postActions'
import { IPostComponentProps } from './IPostComponentProps'
import { IPostComponentState } from './IPostComponentState'

// Import API
import FileAPI from 'api/FileAPI'

// - Create component class
export class PostComponent extends Component<IPostComponentProps, IPostComponentState> {

  styles = {
    dialog: {
      width: '',
      maxWidth: '530px',
      borderRadius: '4px'
    }

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IPostComponentProps) {
    super(props)
    const { post } = props
    this.state = {
      /**
       * Post text
       */
      text: post.get('body', ''),
      /**
       * It's true if whole the text post is visible
       */
      thumbUrl: '',

      /**
       * If it's true, share dialog will be open
       */
      shareOpen: false,
      /**
       * If it's true comment will be disabled on post
       */
      disableComments: post.get('disableComments', false),

      /**
       * Title of share post
       */
      shareTitle: 'Share On',
      /**
       * If it's true, post link will be visible in share post dialog
       */
      openCopyLink: false,

      /**
       * Post menu anchor element
       */
      postMenuAnchorEl: null,
      /**
       * Whether post menu open
       */
      isPostMenuOpen: false
    
    }

    // Binding functions to this

    this.handleVote = this.handleVote.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleOpenShare = this.handleOpenShare.bind(this)
    this.handleCloseShare = this.handleCloseShare.bind(this)
    this.handleCopyLink = this.handleCopyLink.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOpenComments = this.handleOpenComments.bind(this)
    this.loadThumbUrl = this.loadThumbUrl.bind(this)
  }

  /**
   * Toggle on show/hide comment
   */
  handleOpenComments = () => {
    const { post, goTo } = this.props
    goTo!(`/posts/${post.get('ownerUserId')}/${post.get('id')}`)
  }

  /**
   * Delete a post
   *
   */
  handleDelete = () => {
    const { post } = this.props
    this.props.delete!(post.get('id'))
  }

  /**
   * Open post menu
   */
  openPostMenu = (event: any) => {
    this.setState({
      postMenuAnchorEl: event.currentTarget,
      isPostMenuOpen: true
    })
  }

  /**
   * Close post menu
   */
  closePostMenu = (event: any) => {
    this.setState({
      postMenuAnchorEl: event.currentTarget,
      isPostMenuOpen: false
    })
  }
 
  /**
   * Show copy link
   *
   */
  handleCopyLink = () => {
    const {translate} = this.props
    this.setState({
      openCopyLink: true,
      shareTitle: translate!('post.copyLinkButton')
    })
  }

  /**
   * Open share post
   *
   */
  handleOpenShare = () => {
    const {post} = this.props
    copy(`${location.origin}/posts/${post.get('ownerUserId')}/${post.get('id')}`)
    this.setState({
      shareOpen: true
    })
  }

  /**
   * Close share post
   *
   */
  handleCloseShare = () => {
    this.setState({
      shareOpen: false,
      shareTitle: 'Share On',
      openCopyLink: false
    })
  }

  /**
   * Handle vote on a post
   *
   */
  handleVote = () => {
    const {authed, goTo} = this.props
    if (authed) {
        if (this.props.currentUserVote) {
          this.props.unvote!()
        } else {
          this.props.vote!()
        }
    } else {
        goTo!('/login')
    }
     
  }

  shouldComponentUpdate(nextProps: IPostComponentProps ,nextState: IPostComponentState) {
    let shouldUpdate = false

    if (!nextProps.post.equals(this.props.post)) {
      shouldUpdate = true
    }

    if (this.props.getPostComments !== nextProps.getPostComments) {
      shouldUpdate = true
    }

    if (!R.equals(this.state, nextState)) {
      shouldUpdate = true
    }

    return shouldUpdate
  }

  handlePageChange (url: string) {
      const {goTo} = this.props
      goTo!(url)
  }

  loadThumbUrl () {
    const { thumbPath } = this.props
    if (thumbPath && thumbPath !== '') {
      FileAPI.getThumbUrl(thumbPath).then((url) => {
          this.setState({thumbUrl: url})
      })
    } else {
       return 
    }
   
  }

  /**
   * Reneder component DOM
   */
  render () {
    
    const { post, isAdmin, tag, isPostOwner, classes , translate} = this.props
    const { postMenuAnchorEl, isPostMenuOpen, thumbUrl} = this.state
    
    const rightIconMenu = (
      <div>
        <IconButton
          onClick={this.openPostMenu.bind(this)}
        >
          <MoreVertIcon />
        </IconButton>

          <Menu
            open={isPostMenuOpen!}
            anchorEl={postMenuAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.closePostMenu}>
            <MenuItem onClick={this.handleDelete} > {translate!('post.delete')} </MenuItem>
            <MenuItem
              onClick={() => this.props.toggleDisableComments!(!post.get('disableComments'))} >
              {post.get('disableComments') ? translate!('post.enableComments') : translate!('post.disableComments')}
            </MenuItem>
            {isAdmin ? 
              <MenuItem
              onClick={() => AdminAPi.addToFeatured(post.get('id'))} >
              {'Add to featured'}
             </MenuItem>         
               : '' }
          </Menu>
      </div>
    )

    const PostWithThumb = (
      <div className={classes.cardBottemContent}> 
             <div className={classes.image}>
                <Img fileName={post.get('thumbImage') ? post.get('thumbImage') : this.loadThumbUrl()} style={{position: 'inherit'}} />     
             </div>
             <div className={classes.textArea}>  
                <NavLink to={`/posts/${post.get('ownerUserId')}/${post.get('id')}`}>
                          
                        <p className={classes.MainBody}> 
                        {post.get('bodyText')}
                       </p>
                  
                </NavLink>
          </div>
       </div>
    )

    // Define variables
    return (
      <Card key={`post-component-${post.get('id')}`} className={classes.Card}>

          <div className={classes.header}>
             <CardHeader
              action={isPostOwner ? rightIconMenu : ''}
              >
       
             </CardHeader>

        </div>
      
        <CardContent 
           className={classes.cardContent}>
         <NavLink to={`/posts/${post.get('ownerUserId')}/${post.get('id')}`}>
           <h3 className={classes.title}>{post.get('title')}</h3>
          </NavLink>
        {post.get('postTypeId') === 1 ? PostWithThumb : 
 
           <NavLink to={`/posts/${post.get('ownerUserId')}/${post.get('id')}`}>
               <div className={classes.textArea}>  
                        <p className={classes.MainBody}> 
                          {post.get('bodyText')}
                       </p>
               </div>
           </NavLink>}
           
        </CardContent> 

        <CardActions className={classes.cardAction}>
          <div className={classes.RightAction}>
           <div className={classes.avatar}>
            <NavLink to={`/users/${post.get('ownerUserId')}/posts`}>
              <UserAvatar
                fullName={post.get('ownerDisplayName')} 
                fileName={post.get('ownerAvatar')} 
              size={36} />
            </NavLink>
            </div>
            <div style={{display: 'grid', paddingLeft: '10px'}}>
              <span>
                 {<NavLink to={`/users/${post.get('ownerUserId')}/posts`}>{post.get('ownerDisplayName')}</NavLink>}
              </span>
              <div style={{color: '#8b9898'}}>
              <span>
                 {post.get('creationDate') ? moment.unix(post.get('creationDate')).fromNow() + ' | ' + translate!('post.public') : <LinearProgress color='primary' />}
              </span>
              
            </div>
      
          </div>
          </div>
          {tag ? '' : <IconButton
              style={{padding: '0px'}}
              className={classes.iconButton}
              onClick={this.handleVote}
              aria-label='Love'>
          <Checkbox
                className={classes.iconButton}
                checkedIcon={
                <SvgIcon style={{ fill: 'd19228',  stroke: 'black', strokeWidth: '2px' }} 
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
            </IconButton>  }

          <div style={{ display: 'inherit' }}>
            <IconButton 
                style={{padding: '0px'}}
                disabled={post.get('disableCommnets')}
                className={classes.iconButton}
                onClick={this.handleOpenComments}
                aria-label='Comment'>
                <Comment style={{fill: 'black'}}/>
                <div className={classes.commentCounter}> {post.get('commentCounter')! > 0 ? post.get('commentCounter') : ''} </div>
            </IconButton>
            </div>
            
             <IconButton
              style={{padding: '0px'}}
              className={classes.iconButton}
              onClick={this.handleOpenShare}
              aria-label='Comment'>
              <SvgShare style={{fill: 'black'}} />
             </IconButton>
        </CardActions>
        
        <ShareDialog 
        onClose={this.handleCloseShare} 
        shareOpen={this.state.shareOpen} 
        onCopyLink={this.handleCopyLink} 
        openCopyLink={this.state.openCopyLink}
        post={post} />
       
      </Card>

    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPostComponentProps) => {
  const { post, tag} = ownProps
  return {
    vote: () => dispatch(voteActions.dbAddVote(post.get('id'), post.get('ownerUserId'))),
    unvote: () => dispatch(voteActions.dbDeleteVote(post.get('id'), post.get('ownerUserId'))),
    delete: (id: string) => dispatch(postActions.dbDeletePost(id, tag ? tag : 'userPosts')),
    toggleDisableComments: (status: boolean) => {
      dispatch(postActions.dbUpdatePost(post.set('disableComments', status), (x: any) => x))
    },
    goTo: (url: string) => dispatch(push(url)),
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IPostComponentProps) => {
  console.log(ownProps)
  const authed = state.getIn(['authorize', 'authed'], false)
  const uid = state.getIn(['authorize', 'uid'])
  const isAdmin = state.getIn(['authorize', 'isAdmin'], false)
  let currentUserVote = ownProps.post.getIn(['votes', uid], false)
  let thumbPath = ownProps.post.getIn(['imageFullPath'])
  const voteCount = state.getIn(['post', 'userPosts', ownProps.post.get('ownerUserId'), ownProps.post.get('id'), 'score'], 0)
  const user = state.getIn(['user', 'info', ownProps.post.get('ownerUserId')])
  return {
    translate: getTranslate(state.get('locale')),
    authed,
    avatar: user ? user.avatar : '',
    fullName: user ? user.fullName : '',
    thumbPath: thumbPath,
    voteCount,
    currentUserVote,
    isAdmin,
    isPostOwner: uid === ownProps.post.get('ownerUserId') || isAdmin === true
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PostPreview as any)(PostComponent as any) as any)
