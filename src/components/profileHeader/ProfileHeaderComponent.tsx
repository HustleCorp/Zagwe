// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Map, List as ImuList} from 'immutable'
import FollowBox from 'components/FollowButton'

// - Material UI
import { withStyles } from '@material-ui/core/styles'
import PersonAdd from '@material-ui/icons/PersonAdd'

import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Button from '@material-ui/core/Button'

// - Import app components

import EditProfile from 'components/editProfile'
import UserAvatar from 'components/userAvatar'

// - Import API

// - Import actions
import * as userActions from 'store/actions/userActions'
import { IProfileHeaderComponentProps } from './IProfileHeaderComponentProps'
import { IProfileHeaderComponentState } from './IProfileHeaderComponentState'

const styles = (theme: any) => ({
   top: {
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
    },

    info: {
    [theme.breakpoints.up('sm')]: {
       width: '70%',
     },
     paddingLeft: '24px',
     paddingBottom: '16px',
    },

   avatar: {
        [theme.breakpoints.up('sm')]: {
            width: '30%',
            display: 'flex',
         },
        paddingBottom: '16px',
        paddingLeft: '24px',
   },
   tagLine: {
     width: '450px',
    [theme.breakpoints.down('sm')]: {
       width: '290px'
    }
   },

   name: {
    fontSize: '40px',
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
         fontSize: '21px',
         fontWeight: '500',
     },
        
   },
   jwnq: {
      overflowWrap: 'break-word',
      paddingBottom: '16px',
      paddingLeft: '16px'
   },
   xmcsin: {
    [theme.breakpoints.up('sm')]: {
         display: 'flex',
         flexWrap: 'wrap',
         alignItems: 'center',
         marginBottom: '-24px',
     }
   },
   sqsx: {
        paddingBottom: '16px',
        paddingLeft: '16px'
   },
   xmcs: {
         paddingBottom: '16px',
         paddingLeft: '0',
   },

   xmcsBottom: {
        paddingBottom: '16px',
        paddingLeft: '0',
   },
   wgv: {
        lineHeight: '1.4',
        marginBottom: '-16px',
        marginLeft: '-16px',
   },
   dnt: {
        wordBreak: 'break-all',
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '-8px',
        marginLeft: '-24px',
        maxWidth: '450px'
   },
   button: {
     display: 'inline-block',
     height: '32px',
     padding: '0, 11',
     fontsize: '14px',
     lineHeight: '30px'

   },
   flixbox: {
    [theme.breakpoints.up('sm')]: {
       paddingLeft: '13px',
   }
   },
   bqqk: {
         paddingBottom: '8px',
         paddingLeft: '24px',
         minWidth: 0
   },
   bqqk2: {
    paddingBottom: '8px',
    paddingLeft: '24px',
    minWidth: 0,
    marginTop: '-5px'
   },
 
   bttk: {
    paddingBottom: '8px',
    paddingLeft: '24px',
    minWidth: 0
   },
  
   hpcomp: {
        color: '#999',
        transition: 'color .2s ease-in-out,opacity .2s ease-in-out',
        textDecorationSkipInk: 'auto'
   },
   pqqv: {
       width: '14px',
       height: '14px',
       marginTop: '-2px',
       verticalAlign: 'middle',
       transitionProperty: 'fill',
       transitionDuration: '.2s',
       fill: '#999',
       marginRight: '4px',
       [theme.breakpoints.up('md')]: {
            marginRight: '8px'
         }, 
   },
   insideInfo: {
        marginBottom: '-16px',
        marginLeft: '0px'
   },
   insideAvatar: {
        position: 'relative',
        marginLeft: 'auto',
   },
   twitter: {
       marginRight: '7px',
       paddingTop: '5px',
       fill: '#999'
   },
   briefcase: {
     paddingTop: '2px',
     fill: '#999',
     marginRight: '7px',
     marginTop: '5px',
   }
})

/**
 * Create component class
 */
export class ProfileHeaderComponent extends Component<IProfileHeaderComponentProps, IProfileHeaderComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IProfileHeaderComponentProps) {
    super(props)
        /**
         * Defaul state
         */
    this.state = {
            /**
             * If it's true , the window is in small size
             */
      isSmall: false

    }
  
        // Binding functions to `this`
      
  }

    /**
     * Handle resize event for window to change sidebar status
     * @param  {event} evt is the event is passed by winodw resize event
     */
  handleResize = () => {

        // Set initial state
    let width = window.innerWidth

    if (width > 900) {
      this.setState({
        isSmall: false
      })

    } else {
      this.setState({
        isSmall: true
      })
    }
  }

  componentDidMount () {
    this.handleResize()
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const {translate, isAuthedUser, userId, authed,  userInfo, editProfileOpen, classes, followersCount, followingCount} = this.props
    const styles = {
      avatar: {
        border: '2px solid rgb(226, 226, 226',
        width: '130px',
        height: '130px',
        fontSize: 'xx-large',

      },
      iconButton: {
        fill: 'rgb(255, 255, 255)',
        height: '24px',
        width: '24px'

      },
      iconButtonSmall: {
        fill: 'rgb(0, 0, 0)',
        height: '24px',
        width: '24px'
      },

      editButton: {

        marginLeft: '20px'

      },
      editButtonSmall: {

        marginLeft: '20px',
        color: 'white',
        fill: 'blue'

      },
      aboutButton: {
        color: 'white'
      },
      aboutButtonSmall: {
        color: 'black'
      }
    }

    return (
            <div>
                <div >
                    <div className={classes.top}>
                        {/* User avatar*/}
                        <div className={classes.avatar}>
                           <div className={classes.insideAvatar}>
                               <UserAvatar fullName={this.props.fullName || ' '} fileName={this.props.avatar} size={80} style={styles.avatar} />
                           </div>
                        </div>
                        <div className={classes.info}>
                           <div className={classes.insideInfo}>
                                <div className={classes.xmcs}>
                                   <div className={classes.xmcsin}>
                                        <h4 className={classes.name}>
                                          {this.props.fullName}
                                        </h4>
                                        <div className={classes.flixbox}>
          
                                        {isAuthedUser ? (<div>
                                            <Button variant='outlined' size='small' className={classes.margin}  onClick={this.props.openEditor}>
                                            {translate!('profile.editProfileButton')}
                                            </Button>
                                            </div>) :
                                            //  <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={this.handleFollowClick}>
                                            //    <PersonAdd /> Follow
                                            //  </Button>
                                            <FollowBox authed={authed} userId={userId!} userInfo={userInfo!} />
                                            }
                                        
                                       </div>
                                  </div>
                                   
                                </div>
                                <div className={classes.xmcsBottom}>
                                  <div className={classes.wgv}>
                                     <div className={classes.sqsx}>
                                       <div className={classes.dnt}>
                                      {this.props.country ? 
                                      <div className={classes.bqqk}>
                                                <a className={classes.hpcomp}>
                                                    <svg className={classes.pqqv} version="1.1" viewBox="0 0 32 32" width="32" height="32" aria-hidden="false"><path d="M16 0c-6.7 0-12 5.3-12 12 0 8.6 8.6 17.3 11.2 19.7.4.4 1.1.4 1.5 0 2.7-2.4 11.3-11.1 11.3-19.7 0-6.7-5.3-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path></svg>
                                                       {`${this.props.city}, ${this.props.country}`} 
                                                </a>
                                         </div> : ''}
                                        {this.props.website ?                                         
                                         <div className={classes.bqqk}>
                                        
                                            <a href={`http://${this.props.website}`} className={classes.hpcomp}>
                                              <svg className={classes.pqqv} version="1.1" viewBox="0 0 32 32" width="32" height="32" aria-hidden="false"><path d="M16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-12 16c0-3.3 1.3-6.3 3.5-8.5 0 4 .5 5.5 2.5 7.5s5 5.5 5 9.5c0 1.8.5 3 1 3.5-6.6 0-12-5.4-12-12zm16.3 11.2c1.6-1.8 3.5-4.7 2.2-7.2-2-4-9-1-9-5s6.5 1 6.5-7c0-2.9-2.3-3.8-4.7-4h.7c6.6 0 12 5.4 12 12 0 5.1-3.2 9.5-7.7 11.2z"></path></svg>
                                                  {this.props.website}
                                            </a>  
                                         </div> : ''}

                                         {this.props.twitterId ? 
                                          <div className={classes.bqqk}>
                                            <a style={{display: 'flex'}} className={classes.hpcomp}>
                                            <svg viewBox="328 355 335 276"  className={classes.twitter} width="19px" height="19px" aria-hidden="false" xmlns="http://www.w3.org/2000/svg">
                                                <path d="
                                                  M 630, 425
                                                  A 195, 195 0 0 1 331, 600
                                                  A 142, 142 0 0 0 428, 570
                                                  A  70,  70 0 0 1 370, 523
                                                  A  70,  70 0 0 0 401, 521
                                                  A  70,  70 0 0 1 344, 455
                                                  A  70,  70 0 0 0 372, 460
                                                  A  70,  70 0 0 1 354, 370
                                                  A 195, 195 0 0 0 495, 442
                                                  A  67,  67 0 0 1 611, 380
                                                  A 117, 117 0 0 0 654, 363
                                                  A  65,  65 0 0 1 623, 401
                                                  A 117, 117 0 0 0 662, 390
                                                  A  65,  65 0 0 1 630, 425
                                                  Z"
                                                  />   
                                              </svg>
                                              {this.props.twitterId}
                                              </a>
                                            </div>
                                          :
                                          ''
                                          }
                                         {this.props.company ? 
                                           <div className={classes.bqqk2}> 
                                              <a className={classes.hpcomp}>
                                                <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={classes.briefcase} width="17" height="17" viewBox="0 0 24 24"><path d="M24 22h-24v-15h24v15zm-15-20c-1.104 0-2 .896-2 2v2h2v-1.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6z"/></svg>
                                                </span>
                                                 <span>
                                                  {this.props.company}
                                                </span>
                                              </a>
                                            </div> : ''}

                                       </div>
                                     </div>
                                       <div className={classes.jwnq}>
                                            <div className={classes.tagLine}>
                                              {this.props.tagLine}
                                            </div>
                                       </div>
                                       <div className={classes.sqsx}>
                                       <div className={classes.dnt}>
                                         <div className={classes.bqqk}>
                                                <a className={classes.hpcomp}>
                                                    {followersCount} followers
                                                </a>
                                         </div>
                                         <div className={classes.bqqk}>
                                            <a className={classes.hpcomp}>
                                                    {followingCount} following
                                            </a>
                                                 
                                         </div>

                                         </div>
                                       </div>
                                       
                                  </div>
                                </div>
                                
                        </div>
                      </div>
                    </div>

                </div>
                {isAuthedUser && editProfileOpen ? (<EditProfile
                    avatar={this.props.avatar}
                    fullName={this.props.fullName}
                />) : ''}
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
const mapDispatchToProps = (dispatch: any, ownProps: IProfileHeaderComponentProps) => {
  return {
    openEditor: () => dispatch(userActions.openEditProfile())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IProfileHeaderComponentProps) => {
  const authed: boolean = state.getIn(['authorize', 'authed'], false)

  return {
    authed,
    translate: getTranslate(state.get('locale')),
    editProfileOpen: state.getIn(['user', 'openEditProfile']),
    
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ProfileHeaderComponent as any))
