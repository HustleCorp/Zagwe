// - Import react components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment/moment';
import {getTranslate, getActiveLanguage} from 'react-localize-redux';
import {Map} from 'immutable';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {grey, teal} from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core';

// - Import actions
import * as commentActions from 'store/actions/commentActions';

// - Import app components
import CommentListComponent from 'components/commentList';
import UserAvatar from 'components/userAvatar';

import {ICommentGroupComponentProps} from './ICommentGroupComponentProps';
import {ICommentGroupComponentState} from './ICommentGroupComponentState';
import {Comment} from 'core/domain/comments';
import {ServerRequestModel} from 'models/server';
import StringAPI from 'api/StringAPI';
import {ServerRequestType} from 'constants/serverRequestType';
import {ServerRequestStatusType} from 'store/actions/serverRequestStatusType';
import {Profile} from 'core/domain/users';

const styles = (theme: any) => ({
  textField: {
    fontWeight: 400,
    fontSize: '14px',
  },
  header: {
    padding: '2px 3px 3px 10px',
  },
  commentBody: {
    color: 'black',
    fontWeight: 400,
    fontSize: '12px',
    height: '100%',
    border: 'none',
    width: '100%',
    outline: 'none',
    resize: 'none',
  },
  author: {
    fontSize: '10px',
    paddingRight: '10px',
    fontWeight: 400,
    color: 'rgba(0,0,0,0.87)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  noUnderline: {
    display: 'none',
  },
  postButton: {
    flexDirection: 'row-reverse',
  },
});

/**
 * Create component class
 */
export class CommentGroupComponent extends Component<
  ICommentGroupComponentProps,
  ICommentGroupComponentState
> {
  static propTypes = {
    /**
     * If it's true comment box will be open
     */
    open: PropTypes.bool,
    /**
     * If it's true the comment is disable to write
     */
    disableComments: PropTypes.bool,
    /**
     * The post identifier which comment belong to
     */
    postId: PropTypes.string,
    /**
     * If it's true the post owner is the logged in user which this post be long to the comment
     */
    isPostOwner: PropTypes.bool,
    /**
     * Toggle on show/hide comment by passing callback from parent component
     */
    onToggleRequest: PropTypes.func,
    /**
     * The user identifier of the post owner which comment belong to
     */
    ownerPostUserId: PropTypes.string,
  };

  styles = {
    commentItem: {
      height: '60px',
      position: '',
      zIndex: '',
    },
    toggleShowList: {
      height: '60px',
      zIndex: 5,
    },
    writeCommentTextField: {
      width: '100%',
      fontWeight: 400,
      fontSize: '14px',
    },
    progressbar: {
      height: '1.5px',
      backgroundColor: 'rgb(245, 243, 243)',
      color: teal['A400'],
    },
    secondaryText: {
      fontSize: '13px',
      lineHeight: '20px',
      color: 'rgba(0,0,0,0.87)',
      fontWeight: 300,
      whiteSpace: 'pre-wrap',
    },
    primaryText: {
      fontSize: '13px',
      paddingRight: '10px',
      fontWeight: 400,
      color: 'rgba(0,0,0,0.87)',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  };

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ICommentGroupComponentProps) {
    super(props);

    /**
     * Defaul state
     */
    this.state = {
      commentText: '',
      postDisable: true,
    };

    // Binding functions to `this`
    this.handlePostComment = this.handlePostComment.bind(this);
    this.clearCommentWrite = this.clearCommentWrite.bind(this);
  }

  /**
   * Clear comment text field
   */
  clearCommentWrite = () => {
    this.setState({
      commentText: '',
      postDisable: true,
    });
  };

  /**
   * Post comment
   */
  handlePostComment = () => {
    this.props.send!(
      this.state.commentText,
      this.props.postId,
      this.clearCommentWrite,
    );

    this.clearCommentWrite();
  };

  /**
   * When comment text changed
   * @param  {event} evt is an event passed by change comment text callback funciton
   * @param  {string} data is the comment text which user writes
   */
  handleChange = (event: any) => {
    const data = event.target.value;
    this.setState({commentText: data});
    if (data.length === 0 || data.trim() === '') {
      this.setState({
        commentText: '',
        postDisable: true,
      });
    } else {
      this.setState({
        commentText: data,
        postDisable: false,
      });
    }
  };

  /**
   * Render component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const {
      classes,
      postId,
      fullName,
      avatar,
      commentsRequestStatus,
      open,
      isauthed,
      commentSlides,
      translate,
    } = this.props;
    const comments: Map<string, Comment> = this.props.comments || Map({});
    /**
     * Comment list box
     */
    const commentWriteBox = (
      <div>
        <Divider />
        <Paper
          key={postId! + '-commentwrite'}
          elevation={0}
          className="animate2-top10"
        >
          <Card elevation={0}>
            <CardHeader
              className={classes.header}
              avatar={
                <UserAvatar fullName={fullName!} fileName={avatar!} size={24} />
              }
              subheader={
                <TextField
                  autoFocus
                  placeholder={translate!('comment.addCommentPlaceholder')}
                  multiline
                  rowsMax="4"
                  InputProps={{
                    disableUnderline: true,
                    autoFocus: false,
                    fullWidth: true,
                  }}
                  value={this.state.commentText}
                  onChange={this.handleChange}
                  className={classes.textField}
                  fullWidth={true}
                />
              }
            ></CardHeader>
            <CardActions className={classes.postButton}>
              <Button
                color="primary"
                disabled={this.state.postDisable}
                onClick={this.handlePostComment}
              >
                {translate!('comment.postButton')}
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </div>
    );

    const showComments = !comments.isEmpty() ? (
      <CommentListComponent
        comments={comments!}
        isPostOwner={this.props.isPostOwner}
        disableComments={this.props.disableComments}
        postId={postId}
      />
    ) : (
      ''
    );
    const loadComments =
      commentsRequestStatus === ServerRequestStatusType.OK ||
      !comments.isEmpty() ? (
        showComments
      ) : (
        <LinearProgress
          style={this.styles.progressbar}
          variant="indeterminate"
        />
      );
    /**
     * Return Elements
     */
    return (
      <div key={postId + '-comments-group'}>
        <Divider />
        {open ? loadComments : ''}
        {!this.props.disableComments && open && isauthed ? commentWriteBox : ''}
      </div>
    );
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (
  dispatch: any,
  ownProps: ICommentGroupComponentProps,
) => {
  return {
    send: (text: string, postId: string, callBack: Function) => {
      dispatch(
        commentActions.dbAddComment(
          ownProps.ownerPostUserId,
          {
            postId: postId,
            text: text,
          },
          callBack,
        ),
      );
    },
  };
};

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (
  state: Map<string, any>,
  ownProps: ICommentGroupComponentProps,
) => {
  const {ownerPostUserId, postId} = ownProps;
  const uid = state.getIn(['authorize', 'uid'], 0);
  const isauthed = state.getIn(['authorize', 'authed']);
  const requestId = StringAPI.createServerRequestId(
    ServerRequestType.CommentGetComments,
    postId,
  );
  const commentsRequestStatus = state.getIn(['server', 'request', requestId]);
  const commentSlides = state.getIn([
    'post',
    'userPosts',
    ownerPostUserId,
    postId,
    'comments',
  ]);
  const user = state.getIn(['user', 'info', uid]);
  return {
    translate: getTranslate(state.get('locale')),
    commentsRequestStatus: commentsRequestStatus
      ? commentsRequestStatus.status
      : ServerRequestStatusType.NoAction,
    commentSlides,
    isauthed,
    avatar: user ? user.avatar : '',
    fullName: user ? user.fullName : '',
    userInfo: state.getIn(['user', 'info']),
  };
};

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(CommentGroupComponent as any) as any);
