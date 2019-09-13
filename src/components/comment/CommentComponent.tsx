// - Import react components
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import Linkify from 'react-linkify'
import Popover from '@material-ui/core/Popover'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

import { Comment } from 'core/domain/comments'

// - Import material UI libraries
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardHeader, CardMedia, CardContent } from '@material-ui/core'
import ThumpUp from '@material-ui/icons/ThumbUp'
import ThumpDown from '@material-ui/icons/ThumbDown'
import classNames from 'classnames'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API

// - Import actions
import * as commentActions from 'store/actions/commentActions'
import * as userActions from 'store/actions/userActions'

import { ICommentComponentProps } from './CommentComponentProps'
import { ICommentComponentState } from './CommentComponentState'
import { voteActions } from 'src/store/actions'

const styles = (theme: any) => ({
  root: {
     backgroundColor: 'inherit'
  },
  
  header: {
    padding: '2px 3px 3px 10px'
  },
  popperOpen: {
    zIndex: 11
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0
  },
  iconButton: {
    top: 0,
    display: 'flex',
    right: 4,
    flexDirection: 'row-reverse',
    position: 'absolute'

  },
  voteCounter: {
    color: 'rgb(134, 129, 129)',
    fontSize: 10,
    fontWeight: 400,
    padding: 2,
    zIndex: 1
  },
  comment: {
    fontSize: '0.85rem',
    lineHeight: '1.5em',
    fontWeight: '500'

  },
  authorName: {
    title: {
      width: '100%',
      textAlign: 'center',
      display: "inline-block",
      position: "relative",
      marginTop: "30px",
      minHeight: "32px",
      textDecoration: "none",
    },
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  commentBody: {
    paddingLeft: '10px',
    paddingRight: '10px',
    
  },
  cardAction: {
    paddingLeft: '47px',
    marginTop: '-26px',
  },
  SvgIcons: {
     width: '0.6em',
     height: '0.6rem'
  },
  moreIcon: {
    width: '0.6em',
    height: '0.6em'
  },

  IconButton: {
    padding: '12px 0 12px 12px'
  }
})

/**
 * Create component class
 */
export class CommentComponent extends Component<ICommentComponentProps, ICommentComponentState> {
  static propTypes = {
    /**
     * Comment object
     */
    comment: PropTypes.object,
    /**
     * If it's true the post owner is the logged in user which this post be long to the comment
     */
    isPostOwner: PropTypes.bool,
    /**
     * If it's true the comment is disable to write
     */
    disableComments: PropTypes.bool
  }

  /**
   * Fields
   */
  buttonMenu: any = null

  /**
   * DOM styles
   *
   *
   * @memberof CommentComponent
   */
  styles = {
    avatar: {
      paddingTop: '10px',
      paddingRight: '17px'
    },
    author: {
      fontSize: '10px',
      paddingRight: '10px',
      fontWeight: 400,
      color: 'rgba(0,0,0,0.87)',
      textOverflow: 'ellipsis',
      overflow: 'hidden'

    },
   
    authorName: {
      title: {
        width: '100%',
        textAlign: 'center',
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
      },
      display: "inline-block",
      position: "relative",
      margin: '0px',
      minHeight: "32px",
      textDecoration: "none"
    },
    textarea: {
      fontWeight: 400,
      fontSize: '14px',
      border: 'none',
      width: '100%',
      outline: 'none',
      resize: 'none'
    },
    cancel: {
      float: 'right',
      clear: 'both',
      zIndex: 5,
      margin: '0px 5px 5px 0px',
      fontWeight: 400
    }
  }

  /**
   * Fields
   *
   * @type {*}
   * @memberof CommentComponent
   */
  textareaRef: any
  divCommentRef: any
  inputText: any
  divComment: any

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ICommentComponentProps) {
    super(props)
    this.textareaRef = (i: any) => { this.inputText = i }
    this.divCommentRef = (i: any) => { this.divComment = i }

    // Defaul state
    this.state = {
      /**
       * Comment text
       */
      text: this.props.comment.text!,
      /**
       * Comment text to match edit with new comment that is edited
       */
      initialText: this.props.comment.text!,
      /**
       * If comment text dosn't take any change it will be true
       */
      editDisabled: true,
      /**
       * If it's true the post owner is the logged in user which this post be long to the comment
       */
      isPostOwner: false,
      /**
       * The anchor of comment menu element
       */
      openMenu: false,
      /**
       * Anchor element
       */
      anchorEl: null

    }

    // Binding functions to `this`
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpvote = this.handleUpvote.bind(this)
    this.handleDownVote = this.handleDownVote.bind(this)
    this.handleUpdateComment = this.handleUpdateComment.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCancelEdit = this.handleCancelEdit.bind(this)
    this.handleEditComment = this.handleEditComment.bind(this)

  }

  /**
   * Handle show edit comment
   * @param  {event} evt is an event passed by clicking on edit button
   */
  handleEditComment = (evt: any) => {
    this.setState({openMenu: false})
    this.props.openEditor!()
  }

  /**
   * Handle cancel edit
   * @param  {event} evt is an event passed by clicking on cancel button
   */
  handleCancelEdit = (evt: any) => {

    this.setState({
      text: this.state.initialText!
    })
    this.props.closeEditor!()
  }

  /**
   * Handle edit comment
   * @param  {event} evt is an event passed by clicking on post button
   */
  handleUpdateComment = (evt: any) => {
    const { comment } = this.props
    comment.text = this.state.text
    this.props.update!(comment)
    this.setState({
      initialText: this.state.text
    })

  }

  /**
   * When comment text changed
   * @param  {event} evt is an event passed by change comment text callback funciton
   * @param  {string} data is the comment text which user writes
   */
  handleOnChange = (evt: any) => {
    const data = evt.target.value
    if (data.length === 0 || data.trim() === '' || data.trim() === this.state.initialText) {
      this.setState({
        text: data,
        editDisabled: true
      })
    } else {
      this.setState({
        text: data,
        editDisabled: false
      })
    }

  }

  /**
   * Delete a comment
   * @param  {event} evt    an event passed by click on delete comment
   * @param  {string} id     comment identifire
   * @param  {string} postId post identifier which comment belong to
   */
  handleDelete = (evt: any, id?: string | null, postId?: string) => {
    this.props.delete!(id, postId)
  }

  /**
   * Handle comment menu
   */
  handleCommentMenu = (event: any) => {
    this.setState({ openMenu: true,  anchorEl: findDOMNode(this.buttonMenu!), })
  }

  /**
   * Handle close request for comment menu
   */
  handleCloseCommentMenu = () => {
    this.setState({ openMenu: false })
  }
  
  /**
   *  Handle on Pressing Upvote
   */
  handleUpvote () {
    const { upvoteComment, downVoteComment, currentUserUpvoted, currentUserDownVoted, isAuthed} = this.props
      if (isAuthed) {
        if (currentUserDownVoted) {
          downVoteComment!(true) 
          upvoteComment!(false) 
       } else { 
          if (!currentUserUpvoted) {
             upvoteComment!(false)
           } 
       }

      } else {
         alert('Login First')
      }
  }
   
  /**
   * Handle on Pressing DownVote
   */
  handleDownVote () {
    const { upvoteComment, downVoteComment,   currentUserUpvoted, currentUserDownVoted, isAuthed} = this.props
    if (isAuthed) {
      if (currentUserUpvoted) {
        upvoteComment!(true)
        downVoteComment!(false)
        
       } else {
       if (!currentUserDownVoted) {
          downVoteComment!(false)
          } 
      } 
    } else {
       alert('Login first')
    }

  }

  componentWillMount () {
    const { commentOwner } = this.props
    if (!this.props.isCommentOwner && !commentOwner) {
      this.props.getUserInfo!()
    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    /**
     * Comment object from props
     */
    const { comment, classes, fullName, avatar, translate , editorStatus} = this.props
    const { openMenu, anchorEl } = this.state

    const rightIconMenu = (
      <div>
          <IconButton
          buttonRef={(node: any) => {
            this.buttonMenu = node
          }}
            aria-owns={openMenu! ? 'comment-menu' : ''}
            aria-haspopup='true'
            onClick={this.handleCommentMenu}
          >
            <MoreVertIcon className={classes.moreIcon} />
          </IconButton>
            <Popover
                open={openMenu!}
                anchorEl={anchorEl}
                anchorReference={'anchorEl'}
                anchorPosition={{ top: 0, left: 0 }}
                onClose={this.handleCloseCommentMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
              <Paper>
                <MenuList role='menu'>
                  {/* <MenuItem className={classes.rightIconMenuItem}>{translate!('comment.replyButton')}</MenuItem> */}
                  {this.props.isCommentOwner ? (<MenuItem className={classes.rightIconMenuItem} onClick={this.handleEditComment}>{translate!('comment.editButton')}</MenuItem>) : ''}
                  {(this.props.isCommentOwner || this.props.isPostOwner) ? (<MenuItem className={classes.rightIconMenuItem} onClick={(evt: any) => this.handleDelete(evt, comment.id, comment.postId)}>{translate!('comment.deleteButton')}</MenuItem>) : ''}
                </MenuList>
              </Paper>
              </Popover>

              </div>
    )

    const Author = () => (
      <div>
        <NavLink to={`/${userId}`}>
         <span>
            <h4 style={this.styles.authorName as any}>
                  {comment.userDisplayName}
            </h4>
             
         </span>
         </NavLink>
         <span style={{
          fontWeight: 400,
          fontSize: '8px',
          paddingLeft: '10px',
        }}>{moment.unix(comment.creationDate!).fromNow()}</span>
      </div>
    )
    const { userId, upvote, downvote} = comment
    const commentBody = (
      <div style={{ outline: 'none', flex: 'auto', flexGrow: 1, marginTop: '-14px' }}>
      { editorStatus ? <TextField
                placeholder={translate!('comment.updateCommentPlaceholder')}
                multiline
                autoFocus
                rowsMax='4'
                InputProps={{
                  disableUnderline: true,
                  autoFocus: true,
                  fullWidth: true
                }}
                value={this.state.text}
                onChange={this.handleOnChange}
                className={classes.textField}
                fullWidth={true}
              /> :
               <div className={classNames('animate2-top10', )}>
              <h4 className={classes.comment}>
                {this.state.text}
              </h4>
              </div>}

        <div style={{ display: (editorStatus ? 'flex' : 'none'), flexDirection: 'row-reverse' }}>
          <Button color='primary' disabled={this.state.editDisabled}
            style={{ float: 'right', clear: 'both', zIndex: 5, margin: '0px 5px 5px 0px', fontWeight: 400 }}
            onClick={this.handleUpdateComment} > {translate!('comment.updateButton')} </Button>
          <Button color='primary' style={this.styles.cancel as any} onClick={this.handleCancelEdit} > {translate!('comment.cancelButton')} </Button>
        </div>
      </div>
    )
    return (
      <div className='animate-top' key={comment.id!}>
        
          <Card elevation={0} className={classes.root} >
            <CardHeader
              className={classes.header}
              title={editorStatus ? '' : <Author />}
              subheader={commentBody}
              avatar={<NavLink to={`/${userId}`}><UserAvatar fullName={fullName!} fileName={avatar!} size={35} /></NavLink>}
              action={(!this.props.isCommentOwner && !this.props.isPostOwner && this.props.disableComments) || editorStatus ? '' : rightIconMenu}
            >
            </CardHeader>
            <CardActions className={classes.cardAction}> 
              <IconButton
              className={classes.IconButton}
              onClick={this.handleUpvote} 
              aria-label="Add to favorites" >
                <ThumpUp className={classes.SvgIcons}/>
                   <div className={classes.voteCounter}> {upvote} </div>
              </IconButton>
              <IconButton 
              aria-label="Share"
              onClick={this.handleDownVote}
              >
                <ThumpDown className={classes.SvgIcons} />
                <div className={classes.voteCounter}> {downvote} </div>
              </IconButton>
              
          </CardActions>
          </Card>
     
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
const mapDispatchToProps = (dispatch: any, ownProps: ICommentComponentProps) => {
  return {
    delete: (id: string | null, postId: string) => dispatch(commentActions.dbDeleteComment(id, postId)),
    update: (comment: Comment) => {
      dispatch(commentActions.dbUpdateComment(comment))
    },
    openEditor: () => dispatch(commentActions.openCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    closeEditor: () => dispatch(commentActions.closeCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    getUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(ownProps.comment.userId!, '')),
    upvoteComment: (reverse: boolean) => dispatch(voteActions.addVoteComment( ownProps.comment.postId, ownProps.comment.id, reverse)),
    downVoteComment: (reverse: boolean) => dispatch(voteActions.downVoteComment (ownProps.comment.postId, ownProps.comment.id, reverse))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ICommentComponentProps) => {
  const commentOwnerId = ownProps.comment.userId
  const uid = state.getIn(['authorize', 'uid'])
  const isAuthed = state.getIn(['authorize', 'authed'])
  const commentId = ownProps.comment.id
  const postId = ownProps.comment.postId
  const avatar =  ownProps.comment.userAvatar
  const fullName = ownProps.comment.userDisplayName
  const Comment: Map<string, any> = state.getIn(['comment', 'postComments', postId, commentId ])
  const currentUserUpvoted = Comment.getIn(['upvoted', uid], false)
  const currentUserDownVoted = Comment.getIn(['downvoted', uid], false)

  return {
    translate: getTranslate(state.get('locale')),
    uid: uid,
    isAuthed,
    isCommentOwner: (uid === commentOwnerId),
    commentOwner: state.getIn(['user', 'info', commentOwnerId]),
    currentUserUpvoted,
    currentUserDownVoted,
    avatar,
    fullName
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(CommentComponent as any) as any)
