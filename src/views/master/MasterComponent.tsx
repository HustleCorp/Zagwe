
// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ReactGA } from 'data/firestoreClient'
import { push } from 'connected-react-router'
import Snackbar from '@material-ui/core/Snackbar'
import LinearProgress from '@material-ui/core/LinearProgress'
import {Helmet} from 'react-helmet'
import {Map} from 'immutable'
import CustomSnackBarContent from 'StyledComponents/CustomSnackBar/CustomSnackBar.jsx'

// - Import components

import MasterLoading from 'src/components/masterLoading'
import SendFeedback from 'src/components/sendFeedback'
import MasterRouter from 'src/routes/MasterRouter'
import { IMasterComponentProps } from './IMasterComponentProps'
import { IMasterComponentState } from './IMasterComponentState'
import { ServiceProvide, IServiceProvider } from 'src/core/factories'
import { IAuthorizeService } from 'src/core/services/authorize'

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

/* ------------------------------------ */

// - Create Master component class
export class MasterComponent extends Component<IMasterComponentProps, IMasterComponentState> {

  static isPrivate = true

  private readonly _serviceProvider: IServiceProvider
  private readonly _authourizeService: IAuthorizeService
  // Constructor
  constructor (props: IMasterComponentProps) {
    super(props)

    this._serviceProvider = new ServiceProvide()
    this._authourizeService = this._serviceProvider.createAuthorizeService()
    this.state = {
      loading: true,
      authed: false,
      dataLoaded: false,
      isVerifide: false,
      
    }

    // Binding functions to `this`
    this.handleMessage = this.handleMessage.bind(this)

  }

  // Handle click on message
  handleMessage = (evt: any) => {
    this.props.closeMessage()
  }

  componentDidCatch (error: any, info: any) {
    console.log('===========Catched by React componentDidCatch==============')
    console.log(error, info)
    console.log('====================================')
  }

  componentDidMount () {
    console.log('************\n          *\n         * \n        *  \n       *   \n      *    \n     *     \n    *      \n   *      \n  *     \n *     \n*********** \n Well Hello There! Before you continue with your hacking away, I would like to tell you I am looking for developers to join Zagwe in developing cool projects. If you are interested, contact me at bktotient@gmail.com')
    this._authourizeService.onAuthStateChanged((isVerifide: boolean, user: any, isAdmin: boolean) => {

      const {
        global,
        clearData,
        loadDataGuest,
        defaultDataDisable,
        defaultDataEnable,
        login,
        logout,
        showMasterLoading,
        hideMasterLoading,
        goTo,
      } = this.props
      if (user) {
        login(user.uid, isVerifide, isAdmin)
        debugger
        ReactGA.set({userId: user.uid})
        hideMasterLoading!()
        this.setState({
          loading: false,
          isVerifide: true
        })

      } else {
        logout()
        hideMasterLoading!()
        this.setState({
          loading: false,
          isVerifide: false
        })
        if (global.defaultLoadDataStatus) {
          defaultDataDisable()
          clearData()
        }
        loadDataGuest()
        
      }
    })
  }

  /**
   * Render app DOM component
   *
   * @returns
   *
   * @memberof Master
   */
  public render () {

    const { progress, global, uid, sendFeedbackStatus, hideMessage } = this.props
    const { loading} = this.state
    
    return (
      <div id='master'>
        <Helmet>
                <meta charSet='utf-8' />
                <title>Zagwe</title>
                
        </Helmet>
       {sendFeedbackStatus ? <SendFeedback /> : ''}
        <div className='master__progress' style={{ display: (progress.visible ? 'block' : 'none') }}>
          <LinearProgress variant='determinate' value={progress.percent} />
        </div>
        <div className='master__loading animate-fading2' style={{ display: (global.showTopLoading ? 'flex' : 'none') }}>
          <div className='title'>Loading ... </div>
        </div>
       {progress.visible ? <MasterLoading /> : ''}
      
      <MasterRouter enabled={!loading} data={{uid}} />
      
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.props.global.messageOpen}
          onClose={hideMessage}
          autoHideDuration={3000}  
        >
          <CustomSnackBarContent
            onClose={hideMessage}
            variant={this.props.global.variant}
            message={this.props.global.message}
          />
        </Snackbar>
      </div>

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IMasterComponentProps) => {

  return {
    clearData: () => {
      dispatch(imageGalleryActions.clearAllData())
      dispatch(postActions.clearAllData())
      dispatch(userActions.clearAllData())
      dispatch(commentActions.clearAllData())
      dispatch(voteActions.clearAllvotes())
      dispatch(notifyActions.clearAllNotifications())
      dispatch(circleActions.clearAllCircles())
      dispatch(globalActions.clearTemp())

    },
    login: (userId: string, isVerifide: boolean, isAdmin: boolean) => {
      dispatch(authorizeActions.login(userId, isVerifide, isAdmin))
      dispatch(globalActions.defaultDataDisable())
    },
    logout: () => {
      dispatch(authorizeActions.logout())
    },
    defaultDataDisable: () => {
      dispatch(globalActions.defaultDataDisable())
    },
    defaultDataEnable: () => {
      dispatch(globalActions.defaultDataEnable())
    },
    closeMessage: () => {
      dispatch(globalActions.hideMessage())
    },
    loadDataGuest: () => {
      dispatch(globalActions.loadDataGuest())
    },
    goTo: (url: string) => dispatch(push(url)),
    showMasterLoading: () => dispatch(globalActions.showMasterLoading()),
    hideMasterLoading: () => dispatch(globalActions.hideMasterLoading()),
    hideMessage: () => dispatch(globalActions.hideMessage())
  }

}

/**
 * Map state to props
 * @param {object} state
 */
const mapStateToProps = (state: Map<string, any>) => {
  // FIXME: Never use toJS() in mapStateToProps https://redux.js.org/recipes/usingimmutablejs
  const  authorize = Map(state.get('authorize', {})).toJS() as any
  const global = Map(state.get('global', {})).toJS() as any
  const { sendFeedbackStatus, progress } = global
  return {
    sendFeedbackStatus,
    progress,
    guest: authorize.guest,
    uid: authorize.uid,
    authed: authorize.authed,
    isAdmin: authorize.isAdmin,
    global: global
  }

}
// - Connect commponent to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterComponent as any) as any)
