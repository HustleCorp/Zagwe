// - Import react components
import { HomeRouter } from 'routes'
import { Map } from 'immutable'
import React, { Component } from 'react'
import _ from 'lodash'
import {  withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import classNames from 'classnames'
import * as moment from 'moment/moment'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
// - Import app components

import HomeHeader from 'src/components/homeHeader'
import Notifications from 'src/components/FcmNotification'

import { Tags, TagLabel } from 'constants/postType'

// - Import API

// - Import actions
// - Import actions
import {
  authorizeActions,
  imageGalleryActions,
  postActions,
  commentActions,
  voteActions,
  userActions,
  globalActions,
  circleActions,
  notifyActions
} from 'src/store/actions'

import { IHomeComponentProps } from './IHomeComponentProps'
import { IHomeComponentState } from './IHomeComponentState'
import {transition, boxShadow, drawerWidth} from 'assets/jss/material-kit-react.jsx'
import { Post } from 'src/core/domain/posts'

// const drawerWidth = 220
const styles = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'content',
    width: '100%',
    height: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    border: 'none',
    bottom: '0',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    width: drawerWidth,
    ...boxShadow,
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    left: '0',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
    ...transition
  },

  drawerPaperLarge: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%',
    },
    top: 70,
    backgroundColor: '#fafafa',
    borderRight: 0
  },
  menu: {
    height: '100%',
  },
  amharic: {
    fontSize: '18px'
  },
  content: {
    backgroundColor: 'transparent',
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: '-7px',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: '-7px',
    },
  },
  topics: {
     marginTop: '18px',
     [theme.breakpoints.up('sm')]: {
       marginTop: '23px',
    },
    width: '100%',
    fontWeight: '600',
  },
  'content-left': {
    marginLeft: 0,
  },
  'content-right': {
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

})

// - Create Home component class
export class HomeComponent extends Component<IHomeComponentProps, IHomeComponentState> {

  // Constructor
  constructor(props: IHomeComponentProps) {
    super(props)
    // Default state
    const {url} = this.props
    
    this.state = {
        tabIndex: this.getTabIndexByNav(url!)
        
      }
      
         // Binding function to `this`
     this.handleChangeTab = this.handleChangeTab.bind(this)
    }

  /**
   * Get tab index by navigation name
   */
  public getTabIndexByNav: (navName: string) => number = (navName: string) => {
    switch (navName) {
      case `/t/${Tags.topic1}`:
        return 1
      case `/t/${Tags.topic2}`:
        return 2
      case `/t/${Tags.topic3}`:
        return 3
      case `/t/${Tags.topic4}`:
        return 4
      case `/t/${Tags.topic5}`:
        return 5
      case `/t/${Tags.topic6}`:
        return 6
      case `/t/${Tags.topic7}`:
        return 7
      case `/t/${Tags.topic8}`:
          return 8
      case `/t/${Tags.topic9}`:
            return 9
      default:
        return 0
    }
  }

  /**
   * Hamdle on tab change
   */
  handleChangeTab = (event: any, value: any) => {
    const { goTo } = this.props
    this.setState({ tabIndex: value })
    switch (value) {
      case 0:
        goTo!(Tags.home)
        break
      case 1:
        goTo!(`/t/${Tags.topic1}`)
        break
      case 2:
        goTo!(`/t/${Tags.topic2}`)
        break
      case 3:
        goTo!(`/t/${Tags.topic3}`)
        break
      case 4:
        goTo!(`/t/${Tags.topic4}`)
        break
      case 5:
        goTo!(`/t/${Tags.topic5}`)
        break
      case 6:
          goTo!(`/t/${Tags.topic6}`)
          break 
      case 7:
        goTo!(`/t/${Tags.topic7}`)
        break
      case 8:
          goTo!(`/t/${Tags.topic8}`)
          break
      case 9:
            goTo!(`/t/${Tags.topic9}`)
            break
      case 10:
            goTo!(`/t/${Tags.topic10}`)
            break
      case 11:
            goTo!(`/t/${Tags.topic11}`)
            break
   
      default:
        break
    }
  }

  componentWillMount() {
    const { global, clearData, loadData, authed, isGuest, defaultDataEnable, isVerifide, goTo } = this.props

    if (!authed && !isGuest) {
      goTo!('/login')
      return
    }
    if (!isVerifide && !isGuest) {
      goTo!('/emailVerification')

    } else if (!global.get('defaultLoadDataStatus' || isGuest)) {
      clearData!()
      
      defaultDataEnable!()
    }
  }

  componentDidMount () {

   const {loadOtherData, loadData, authed} = this.props
        loadData!()
       if ( authed ) {
          loadOtherData!()
        }
     
  }

  /**
   * Render DOM component
   *
   * @returns DOM
   *
   * @memberof Home
   */
  render() {
    const HR = HomeRouter
    
    const { loaded, authed, uid, loadDataStream, mergedPosts, hasMorePosts, url, showSendFeedback,isGuest, translate, classes, theme } = this.props
    const load = loaded || isGuest
    const displayTop = url ? url.match('/t/') !== null || url === '/' || url.match('/posts/') : false

    const anchor = theme.direction === 'rtl' ? 'right' : 'left'

    return (
      <div className={classes.root}>
         
        <div className={classes.appFrame}>
            <HomeHeader />
             <div className={classes.topics} style={{display: displayTop ? 'inline-block' : 'none'}} >
                  
                  <Tabs 
                    onChange={this.handleChangeTab}
                    value={this.state.tabIndex} 
                    variant="scrollable"
                    textColor='primary'
                    >
                      <Tab label={`${TagLabel.home}`} />
                      <Tab label={`${TagLabel.topic1}`} />
                      <Tab style={{display: isGuest ? 'none' : ''}} label={`${TagLabel.topic2}`} /> : ''}
                      <Tab label={`${TagLabel.topic3}`} />
                      <Tab label={`${TagLabel.topic4}`} />
                      <Tab className={classes.amharic} label={`ገጠመኝ`} />
                      <Tab label={`${TagLabel.topic6}`} />
                      <Tab label={`${TagLabel.topic7}`} />
                      <Tab label={`${TagLabel.topic8}`} />
                      <Tab label={`${TagLabel.topic9}`} />
                      <Tab className={classes.amharic} label={`ተረት ተረት`} />
                      <Tab label={`${TagLabel.topic11}`} />
                    </Tabs>
        
          </div>
          
          <main
            className={classNames(classes.content, classes[`content-${anchor}`])}

          >
           {authed ?  <Notifications userId={this.props.uid}/> : ''}
            <HR enabled={load!} data={{ mergedPosts: mergedPosts, loadDataStream, hasMorePosts, uid }} />
          </main>
      
        </div>
      </div>

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IHomeComponentProps) => {

  return {
    loadDataStream: ( ) => dispatch(postActions.dbGetTopPosts()),
    loadData: ( ) => {
      dispatch(userActions.dbGetUserInfo())
      dispatch(postActions.dbGetTopPosts())
    },
    loadOtherData: () => {   
      dispatch(imageGalleryActions.dbGetImageGallery())
      dispatch((userActions.dbGetUserOther()))
      dispatch(notifyActions.dbGetNotifications())
      dispatch(circleActions.dbGetCircles())
      dispatch(circleActions.dbGetUserTies())
      dispatch(circleActions.dbGetFollowers())
      
    },
    clearData: () => {
    dispatch(imageGalleryActions.clearAllData())
      dispatch(postActions.clearAllData())
      dispatch(userActions.clearAllData())
      dispatch(notifyActions.clearAllNotifications())
      dispatch(circleActions.clearAllCircles())
      dispatch(globalActions.clearTemp())

    },
    defaultDataDisable: () => {
      dispatch(globalActions.defaultDataDisable())
    },
    defaultDataEnable: () => {
      dispatch(globalActions.defaultDataEnable())
    },
    goTo: (url: string) => dispatch(push(url)),
    showSendFeedback: () => dispatch(globalActions.showSendFeedback()),
    hideSendFeedback: () => dispatch(globalActions.hideSendFeedback())

  }

}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IHomeComponentProps) => {
  const url: string = state.getIn(['router', 'location', 'pathname'], '') as string
  const uid = state.getIn(['authorize', 'uid'], {})
  const isGuest = state.getIn(['authorize', 'guest'])
  const global = state.get('global', {})
  let mergedPosts = Map({})
  const Posters: Map<string, any> = state.getIn(['post', 'userPosts'], {})
  const hasMorePosts = state.getIn(['post', 'stream', 'userPosts', 'hasMoreData' ], true)
  Posters.forEach((user, userId) => {
    let newPosts = state.getIn(['post', 'userPosts', userId], {})
    mergedPosts = mergedPosts.merge(newPosts)
  })
  return {
    authed: state.getIn(['authorize', 'authed'], false),
    url,
    isGuest,
    isVerifide: state.getIn(['authorize', 'isVerifide'], false),
    translate: getTranslate(state.get('locale')),
    currentLanguage: getActiveLanguage(state.get('locale')).code,
    mergedPosts,
    global,
    hasMorePosts,
    loaded: state.getIn(['user', 'loaded']) && state.getIn(['imageGallery', 'loaded']) && state.getIn(['notify', 'loaded']) && state.getIn(['circle', 'loaded'])
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(HomeComponent as any) as any)) as typeof HomeComponent
