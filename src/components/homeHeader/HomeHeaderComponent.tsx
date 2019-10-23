// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import { push } from 'connected-react-router'
// - Material UI
import SearchIcon from '@material-ui/icons/Search'
import Add from '@material-ui/icons/AddCircle'
import People from '@material-ui/icons/People'

import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

// Search funtionalities
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,

} from 'react-instantsearch-dom'

import Menu from '@material-ui/core/Menu'
import Badge from '@material-ui/core/Badge'
import CloseIcon from '@material-ui/icons/Close'
import InputBase from '@material-ui/core/InputBase'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import {  Theme } from '@material-ui/core/styles'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'
import Loadable from 'react-loadable'
import Notificaton from 'components/notify'

// - Import components
import UserAvatarComponent from 'components/userAvatar'

// - Import actions
import { authorizeActions } from 'store/actions'
import { globalActions } from 'store/actions'
import { IHomeHeaderComponentProps } from './IHomeHeaderComponentProps'
import { IHomeHeaderComponentState } from './IHomeHeaderComponentState'
import { NavLink } from 'react-router-dom'

const searchClient = algoliasearch('GDLJD9WT4N', '1a976afc8891eef33f27a09de414146c')

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: '#a5792a'
  },
  flex: {
    flex: 1
  },
  homeRight: {
    display: 'flex'
  },
  appBar: {
     boxShadow: 'none',
     height: 'fit-content',
     backgroundColor: '#fafafa',
  },
  Toolbar: {
      justifyContent: 'space-between'
  },
  vertBreak: {
    backgroundColor: '#ddd',
    width: '1px',
    height: '38px',
    flexShrink: '0',
  },
  submitButton: {
    marginRight: '20px',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
     },
    width: 'max-content'
     
  },

  submitButtonSmall: {
     [theme.breakpoints.up('md')]: {
      display: 'none'
     }
  },
  submitButtonDiv: {
    paddingTop: '10px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
     }
  },
  tobeAuth: {
    marginLeft: '10px',
    position: 'relative',
    display: 'inline-flex'
  },
  margin: {
    color: '#7d7171',
    fill: 'currentColor',
    backgroundColor: 'inherit',
    borderColor: '#ddd'
  },
  HomeButton: {
    display: 'inline-block',
    paddingTop: '4px',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
     }
  },
  HomeIcon: {
    display: 'inline-block',
    paddingLeft: '33px',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
     }
  },
  searchSmall: {
    paddingTop: '10px',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
     }
  },

    search: {
      position: 'relative',
      borderRadius: '25px',
      backgroundColor: 'inherit',
      borderStyle: 'inset',
      borderColor: '#48101008',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(3),
        width: 'auto',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none'
       }
    },
    Discover: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
       }
    },
    DiscoverSmall: {
      paddingTop: '10px',
      [theme.breakpoints.up('md')]: {
        display: 'none'
       }
    },

    searchIcon: {
     
      height: '100%',
      position: 'absolute',
      paddingLeft: '5px',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#837170',
    },
    inputRoot: {
      color: 'black',
      marginLeft: '30px',
      
    },
    inputInput: {
      // padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      marginLeft: '10px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    spaceSearch: {
      height: '80px'
    },
    spanValue: {
      [theme.breakpoints.up('md')]: {
         fontSize: '18px',
      },
      [theme.breakpoints.down('md')]: {
       fontSize: '15px',
       top: '-4px',
       position: 'relative'
      }
   },
})

// - Create HomeHeader component class
export class HomeHeaderComponent extends Component<IHomeHeaderComponentProps, IHomeHeaderComponentState> {

  styles = {
    avatarStyle: {
      margin: 5,
      cursor: 'pointer'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IHomeHeaderComponentProps) {
    super(props)

    // Default state
    this.state = {
      /**
       * User avatar popover is open if true
       */
      openAvatarMenu: false,
      /**
       * Show header title or not (true/false)
       */
      showTitle: true,
      /**
       * If true notification menu will be open
       */
      openNotifyMenu: false,

      searchOpen: false,

      searchText: '',

      tabIndex: 0,
    }

    // Binding functions to `this`
    this.handleCloseNotify = this.handleCloseNotify.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDiscoverClick = this.handleDiscoverClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.HitPost = this.HitPost.bind(this)
    this.HitUser = this.HitUser.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleChangeTab = (event: any, value: any) => {
    this.setState({ tabIndex: value })

  }
  
  HitPost = (props: any) => {
    return (
      <div onClick={this.handleClose}>
       <NavLink to={`/posts/${props.hit.ownerUserId}/${props.hit.objectID}`}>
        <img style={{width: 'auto'}} src={props.hit.thumbImage}  alt={props.hit.thumbImage} />
        <div className="hit-name">
          <Highlight attribute="title" hit={props.hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="bodyText" hit={props.hit} />
        </div>
        <div className="hit-username">{props.hit.ownerDisplayName}</div>
        </NavLink>
      </div>
    )
  }

  HitUser = (props: any) => {
    return (
      <NavLink to={`/users/${props.hit.objectID}/posts`}>
       <div className='user-hit' onClick={this.handleClose}>
        <div className='hit-image'>
          <img style={{width: '100px'}} src={props.hit.avatar}  alt={props.hit.avatar} />
        </div>
        <div className='hit-text'> 
          <div className="hit-name">
            <Highlight attribute="fullName" hit={props.hit} />
          </div>
          <div className="hit-description">
            <Highlight attribute="tagLine" hit={props.hit} />
          </div>
        </div>
       </div>
      </NavLink>
    )
  }

  handleSearchChange = (event: any) => {
    this.setState({searchText: event.target.value})
  }

  /**
   * Handle close notification menu
   *
   */
  handleCloseNotify = () => {
    this.setState({
      openNotifyMenu: false
    })
  }
  /**
   * Handle notification touch
   *
   */
  handleNotifyTouchTap = (event: any) => {
    // This prevents ghost click.
    // event.preventDefault()

    this.setState({
      openNotifyMenu: true,
      anchorEl: event.currentTarget
      
    })
    
  }

  /**
   * Handle touch on user avatar for popover
   *
   */
  handleAvatarTouchTap = (event: any) => {
    this.setState({
      openAvatarMenu: true,
      anchorEl: event.currentTarget
    })
  }

  /**
   * Handle logout user
   *
   */
  handleLogout = () => {
    this.props.logout!()
    this.handleRequestClose()
  }

  handleClose = () => {
    this.setState({searchOpen: false})
  }

  handleOpen = () => {
    const searchText = this.state.searchText
    this.setState({searchOpen: true})
  }
  
  handleLogin = () => {
    const {goTo} = this.props
    goTo!('/login')
  }

  handleSubmit = () => {
    const {goTo} = this.props
    goTo!('/submit')
  }

  handleProfileClick = () => {
      const {uid} = this.props
      this.props.goTo!(`/users/${uid}/posts`)
  }

  handleDiscoverClick = () => {
      const {authed} = this.props
      if (authed) {
      this.props.goTo!('/people')
      } else {
     this.props.goTo!('/login')
      }
  }

  handleHomeClick = () => {
    this.props.goTo!('/')
  }
  
  handleSendFeedBack = () => {
    this.props.openFeedBack!()
    this.handleRequestClose()
  }
  /**
   * Handle close popover
   *
   */
  handleRequestClose = () => {
    this.setState({
      openAvatarMenu: false,
      anchorEl: null
    })
  }
  
  // Render app DOM component
  render () {
    const { classes , translate, theme, authed} = this.props
    const anchor = theme.direction === 'rtl' ? 'right' : 'left'
    return (

      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.Toolbar}>
          {/* Left side */}
          <div className='homeHeader__left'>
            <div className={classes.HomeButton} >
                <a>
                  <img onClick={this.handleHomeClick} style={{width: 'auto'}} src='/logo.jpeg' alt="Smiley face" height="35" width="35Y"></img>
                </a>
          </div>
             <a>
              <div className={classes.HomeIcon} onClick={this.handleHomeClick}>
                  <img  style={{width: 'auto'}} src='/Zagwe.jpeg' alt="Smiley face" height="35" width="35Y"></img> 
              </div>
              </a>
           </div>

          <div className='homeHeader_center'>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onClick={this.handleOpen}
                  onChange={this.handleSearchChange}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <a onClick={this.handleOpen}>
                <div className={classes.searchSmall}>
                    <SearchIcon color='secondary' />
                </div>
              </a>

          </div>

          <div className='homeHeader_centerRight'>
               <div className={classes.Discover}>
                    <Button  size='small' className={classes.margin}  onClick={this.handleDiscoverClick}>
                         Discover
                    </Button> 
                </div>
                <div className={classes.DiscoverSmall}>
                     <People color='secondary' onClick={this.handleDiscoverClick}/>
                </div>
          </div>
        <div className={classes.submitButtonDiv}>
          <div className={classes.submitButtonSmall}>
                <Add color='secondary' onClick={this.handleSubmit}/>
          </div>
        </div>  

          {/* Notification */}
            <div className='homeHeader__right'>
              <div className={classes.submitButton}>
                <Button variant='outlined' size='small' className={classes.margin}  onClick={this.handleSubmit}>
                        Submit a post
                </Button> 
              </div>
          
              <div className={classes.vertBreak}></div>
              <div className={classes.tobeAuth}>
                { authed 
                       ? 
                     <div className={classes.homeRight}>   
                       {this.props.notifyCount! > 0 ? (
  
                              <IconButton arial-label="Notification">
                                <Badge badgeContent={this.props.notifyCount} color="primary">
                                  <NotificationsIcon onClick={this.handleNotifyTouchTap} color='secondary'/>
                                </Badge>
                              </IconButton>
                              )
                              : (<Tooltip title={translate!('header.notificationTooltip')}>
                              <IconButton onClick={this.handleNotifyTouchTap}>
                                <NotificationsIcon color='secondary' />
                              </IconButton>
                              </Tooltip>)
                        } 

                    <Notificaton open={this.state.openNotifyMenu} anchorEl={this.state.anchorEl} onRequestClose={this.handleCloseNotify} />
                     
                    {/* User avatar*/}
                    <UserAvatarComponent
                      onClick={this.handleAvatarTouchTap}
                      fullName={this.props.fullName!}
                      fileName={this.props.avatar!}
                      size={32}
                      style={this.styles.avatarStyle}
                    />
                    </div>
                    : 
                    <Button  size='small' className={classes.margin}  onClick={this.handleLogin}>
                    {translate!('login.loginButton')}
                    </Button> 
                    }
           </div>
          
          </div>
          <Menu
              open={this.state.openAvatarMenu}
              anchorEl={this.state.anchorEl!}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              onClose={this.handleRequestClose}>
              <MenuItem style={{ fontSize: '14px' }}
               onClick={this.handleProfileClick.bind(this)} > {translate!('header.myAccount')} </MenuItem>
              <MenuItem style={{ fontSize: '14px' }} onClick={this.handleSendFeedBack}> Send FeedBack </MenuItem>
              <MenuItem style={{ fontSize: '14px' }} onClick={this.handleLogout} > {translate!('header.logout')} </MenuItem>
              
            </Menu>

        </Toolbar>

        <Dialog fullScreen open={this.state.searchOpen} onClose={this.handleClose} >
        <InstantSearch indexName={this.state.tabIndex === 0 ? 'posts' : 'users'} searchClient={searchClient}>
        <AppBar className={classes.appBar}>
          <Toolbar>
           <IconButton  color="inherit" onClick={this.handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
               <SearchBox /> 
          </Toolbar>
        </AppBar>
        <div className={classes.spaceSearch}>

        </div>
        <Tabs 
        onChange={this.handleChangeTab}
        value={this.state.tabIndex}
         centered
        textColor='primary'
        >
          <Tab label={'Posts'} />
          <Tab label={'Users'} />
        </Tabs>
        <Hits hitComponent={this.state.tabIndex === 0 ? this.HitPost : this.HitUser} />
        <Pagination />
      </InstantSearch>

     </Dialog>
      </AppBar >
      
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: Function, ownProps: IHomeHeaderComponentProps) => {
  return {
     logout: () => dispatch(authorizeActions.dbLogout()),
     goTo: (url: string) => dispatch(push(url)),
     openFeedBack: () => dispatch(globalActions.showSendFeedback())
  }
}

// - Map state to props
const mapStateToProps = (state: Map<string,any>, ownProps: IHomeHeaderComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'], 0)
  const authed = state.getIn(['authorize', 'authed'], false)
  const userNotifies: Map<string, any> = state.getIn(['notify','userNotifies'])
  let notifyCount = userNotifies
    ? userNotifies
      .filter((notification) => !notification.get('isSeen', false)).count()
    : 0
    const user = state.getIn(['user', 'info', uid], {})
  return {
    uid,
    authed,
    translate: getTranslate(state.get('locale')),
    avatar: user ? user.avatar : '',
    fullName: user ? user.fullName : '',
    title: state.getIn(['global', 'headerTitle'], ''),
    notifyCount,
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(HomeHeaderComponent as any) as any)
