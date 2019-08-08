// - Import react components
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Map } from 'immutable'

import { push } from 'connected-react-router'
// - Material UI
import SearchIcon from '@material-ui/icons/Search'
import Home from '@material-ui/icons/Home'
import Add from '@material-ui/icons/AddCircle'
import People from '@material-ui/icons/People'

import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

import Popover from '@material-ui/core/Popover'
import AppBar from '@material-ui/core/AppBar'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Badge from '@material-ui/core/Badge'
import InputBase from '@material-ui/core/InputBase'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import {  Theme } from '@material-ui/core/styles'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import config from 'src/config'

// - Import components
import UserAvatarComponent from 'components/userAvatar'
import Notify from 'components/notify'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import { authorizeActions } from 'store/actions'
import { IHomeHeaderComponentProps } from './IHomeHeaderComponentProps'
import { IHomeHeaderComponentState } from './IHomeHeaderComponentState'

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
     color: '#837170',
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
    [theme.breakpoints.up('sm')]: {
      display: 'none'
     }
  },
  HomeIcon: {
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
     }
  },
  searchSmall: {
    paddingTop: '10px',
    color: '#837170',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
     }
  },

  spacing: {

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
      color: '#837170',
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
      openNotifyMenu: false
    }

    // Binding functions to `this`
    this.handleCloseNotify = this.handleCloseNotify.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDiscoverClick = this.handleDiscoverClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
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
    event.preventDefault()

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
      this.props.goTo!(`/${uid}/posts`)
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
              <IconButton onClick={this.handleHomeClick} >
                  <Home style={{ cursor: 'pointer' }} />
              </IconButton>
          </div>
              <div className={classes.HomeIcon} onClick={this.handleHomeClick}>
                  <Typography variant='h6' style={{ marginLeft: '15px' }} >
                    {config.settings.appName}
                  </Typography>
              </div>
           </div>

          <div className='homeHeader_center'>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.searchSmall}>
                   <SearchIcon />
              </div>

          </div>

          <div className='homeHeader_centerRight'>
               <div className={classes.Discover}>
                    <Button  size='small' className={classes.margin}  onClick={this.handleDiscoverClick}>
                         Discover
                    </Button> 
                </div>
                <div className={classes.DiscoverSmall}>
                     <People onClick={this.handleDiscoverClick}/>
                </div>
          </div>
        <div className={classes.submitButtonDiv}>
          <div className={classes.submitButtonSmall}>
                <Add onClick={this.handleSubmit}/>
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
                                  <NotificationsIcon onClick={this.handleNotifyTouchTap}/>
                                </Badge>
                              </IconButton>
                              )
                              : (<Tooltip title={translate!('header.notificationTooltip')}>
                              <IconButton onClick={this.handleNotifyTouchTap}>
                                <NotificationsIcon style={{color: theme.palette.common.white}} />
                              </IconButton>
                              </Tooltip>)
                        } 

                    <Notify open={this.state.openNotifyMenu} anchorEl={this.state.anchorEl} onRequestClose={this.handleCloseNotify} />
                     
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
              <MenuItem style={{ fontSize: '14px' }} onClick={this.handleLogout.bind(this)} > {translate!('header.logout')} </MenuItem>

            </Menu>

        </Toolbar>
      </AppBar >
      
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: Function, ownProps: IHomeHeaderComponentProps) => {
  return {
    logout: () => dispatch(authorizeActions.dbLogout()),
     goTo: (url: string) => dispatch(push(url)),
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
