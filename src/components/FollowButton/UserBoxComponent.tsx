// - Import react components
import React, { Component } from 'react'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map, List as ImuList} from 'immutable'

// - Material UI

import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API
import StringAPI from 'api/StringAPI'

// - Import actions
import * as circleActions from 'store/actions/circleActions'
import * as userActions from 'store/actions/userActions'

import { IUserBoxComponentProps } from './IUserBoxComponentProps'
import { IUserBoxComponentState } from './IUserBoxComponentState'
import { User } from 'core/domain/users'
import { UserTie, Circle } from 'core/domain/circles'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    height: 254,
    width: 243,
    margin: 10,
    textAlign: 'center',
    minWidth: 230,    
    maxWidth: '257px'
  },
  dialogContent: {
    paddingTop: '5px',
    padding: '0px 5px 5px 5px'
  },
  circleName: {
    fontSize: '1rem'
  },
  space: {
    height: 20
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  }
})

/**
 * Create component class
 */
export class UserBoxComponent extends Component<IUserBoxComponentProps, IUserBoxComponentState> {
  /**
   * Fields
   */
  static propTypes = {
    /**
     * User identifier
     */
    userId: PropTypes.string,
    /**
     * User information
     */
    user: PropTypes.object

  }

  styles = {
    followButton: {
      bottom: '30px',
      left: 0,
      right: 0
    },
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IUserBoxComponentProps) {
    super(props)
    const { userBelongCircles, circles, userId } = this.props
    // Defaul state
    this.state = {
      /**
       * The value of circle input
       */
      circleName: ``,
      /**
       * It will be true if the text field for adding group is empty
       */
      disabledCreateCircle: true,
      /**
       * The button of add user in a circle is disabled {true} or not {false}
       */
      disabledAddToCircle: true,
      /**
       * Whether current user changed the selected circles for referer user
       */
      disabledDoneCircles: true
    }
   
  }

  /**
   * Handle follow user
   */
  onFollowUser = (event: any) => {
    // This prevents ghost click
    event.preventDefault()
    const { isFollowed, followUser, followingCircle, deleteFollowingUser, userId, userInfo, authed, followRequest} = this.props
    const avatar = userInfo.avatar
    const fullName = userInfo.fullName

    if (followRequest && followRequest.status === ServerRequestStatusType.Sent) {
      return
    }
    if (!isFollowed) {
      followUser!(followingCircle![0], {avatar, userId, fullName })
    } else {
      deleteFollowingUser!(userId)
    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const { 
      isFollowed,
      firstBelongCircle,
      belongCirclesCount,
      followRequest, 
      deleteFollowingUserRequest,  
      translate,
      authed,
    } = this.props

    return (
          <div style={this.styles.followButton as any}>
            <Button
              variant='outlined'
              size='small'
              onClick={this.onFollowUser}
              disabled={ 
                (authed! === false ) ||
                (followRequest ? followRequest.status === ServerRequestStatusType.Sent : false) ||
                (deleteFollowingUserRequest ? deleteFollowingUserRequest.status === ServerRequestStatusType.Sent : false)
             }
            >
              {!isFollowed ? translate!('userBox.followButton')
                : (belongCirclesCount! > 1 ? translate!('userBox.numberOfCircleButton', {circlesCount: belongCirclesCount}) : ((firstBelongCircle) ? firstBelongCircle.get('name', 'Followed') : translate!('userBox.followButton')))}
            </Button>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IUserBoxComponentProps) => {
  const userId = ownProps.userId
  return {
    addUserToCircle: (circleIds: ImuList<string>, user: UserTie) => dispatch(circleActions.dbUpdateUserInCircles(circleIds, user)),
    followUser: (circleId: string, userFollowing: UserTie) => dispatch(circleActions.dbFollowUser(circleId, userFollowing)),
    deleteFollowingUser: (followingId: string) => dispatch(circleActions.dbDeleteFollowingUser(followingId)),
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IUserBoxComponentProps) => {
  const authed: boolean = state.getIn(['authorize', 'authed'], false)
  const circles: Map<string, Map<string, any>> = state.getIn(['circle', 'circleList'], {})
  const userBelongCircles: ImuList<any> = state.getIn(['circle', 'userTies', ownProps.userId, 'circleIdList'], ImuList())
  const isFollowed = userBelongCircles.count() > 0
  const followingCircle = circles
          .filter((followingCircle) => followingCircle!.get('isSystem', false) && followingCircle!.get('name') === `Following`)
          .toArray()[0]
  const followRequestId = StringAPI.createServerRequestId(ServerRequestType.CircleFollowUser, ownProps.userId)
  const followRequest = state.getIn(['server', 'request', followRequestId])
  const addToCircleRequestId = StringAPI.createServerRequestId(ServerRequestType.CircleAddToCircle, ownProps.userId)
  const addToCircleRequest = state.getIn(['server', 'request', addToCircleRequestId])
  const deleteFollowingUserRequestId = StringAPI.createServerRequestId(ServerRequestType.CircleDeleteFollowingUser, ownProps.userId)
  const deleteFollowingUserRequest = state.getIn(['server', 'request', deleteFollowingUserRequestId])
  const selectedCircles = state.getIn(['circle', 'selectedCircles', ownProps.userId], [])
  
  const isSelecteCirclesOpen = state.getIn(['circle', 'openSelecteCircles', ownProps.userId], [])

  return {
    authed,
    translate: getTranslate(state.get('locale')),
    isSelecteCirclesOpen,
    isFollowed,
    selectedCircles,
    circles,
    followingCircle,
    deleteFollowingUserRequest,
    userBelongCircles,
    followRequest,
    belongCirclesCount: userBelongCircles.count() || 0,
    firstBelongCircle: userBelongCircles ?  circles.get(userBelongCircles.get(0), Map({})) : Map({}),
    
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(UserBoxComponent as any) as any)
