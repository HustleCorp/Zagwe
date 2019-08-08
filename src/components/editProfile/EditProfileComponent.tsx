// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import moment from 'moment/moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import {Map} from 'immutable'

import SvgCamera from '@material-ui/icons/PhotoCamera'
import Button from '@material-ui/core/Button'
import EventListener, { withOptions } from 'react-event-listener'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import  FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

// - Import app components
import UserAvatarComponent from 'components/userAvatar'
import ImageGallery from 'components/imageGallery'
import AppDialogTitle from 'layouts/dialogTitle'
import AppInput from 'layouts/appInput'

// - Import API

// - Import actions
import * as userActions from 'store/actions/userActions'

import { IEditProfileComponentProps } from './IEditProfileComponentProps'
import { IEditProfileComponentState } from './IEditProfileComponentState'
import { Profile } from 'core/domain/users'

const styles = (theme: any) => ({
  dialogTitle: {
    padding: 0
  },
  dialogContentRoot: {
    minWidth: 330,
    [theme.breakpoints.down('xs')]: {
      maxHeight: '100%',
    }

  },
  avatar: {
    border: '2px solid rgb(226, 226, 226',
    width: '130px',
    height: '130px',

  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0
    }
  },
  fixedDownStickyXS: {
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'white',
      width: '100%'
    }
  },
  bottomPaperSpace: {
    height: 16,
    [theme.breakpoints.down('xs')]: {
      height: 90
    }
  },
  boxBorder: {
    paddingBottom: '10px',
    display: 'flex'

  },
  bottomTextSpace: {
    marginBottom: 15
  },
  dayPicker: {
    width: '100%',
    padding: '13px 0px 8px'
  }
})

/**
 * Create component class
 */
export class EditProfileComponent extends Component<IEditProfileComponentProps, IEditProfileComponentState> {

  static propTypes = {

    /**
     * User avatar address
     */
    avatar: PropTypes.string,
    /**
     * User avatar address
     */
    banner: PropTypes.string,
    /**
     * User full name
     */
    fullName: PropTypes.string.isRequired

  }

  styles = {
    avatar: {
      border: '2px solid rgb(226, 226, 226',
      width: '130px',
      height: '130px',

    },
    paper: {
      width: '100%',
      height: '100%',
      margin: '0 auto',
      display: 'block',
      padding: '32px'
    },
    title: {
      padding: '24px 24px 20px 24px',
      font: '500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
      display: 'flex',
      wordWrap: 'break-word',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      flexGrow: 1
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '24px 24px 20px'
    },
    updateButton: {
      marginLeft: '10px'
    },
    dialogGallery: {
      width: '',
      maxWidth: '530px',
      borderRadius: '4px'
    },
    iconButtonSmall: {
    },
    iconButton: {
    }

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IEditProfileComponentProps) {
    super(props)
    // Default state
    console.log(this.props) 
    this.state = {
      /**
       * If it's true the winow is in small size
       */
      isSmall: false,
      /**
       * User tag line input value
       */
      tagLineInput: props.info!.tagLine || '',
      /**
       * User full name input value
       */
      fullNameInput: props.info!.fullName || '',
      /**
       * Error message of full name input
       */
      fullNameInputError: '',

      /**
       * User avatar address
       */
      avatar: props.avatar || '',

      avatarPath: props.avatarPath || '',

      cityInput: props.info!.city  || '',

      countryInput: props.info!.country || '',
     
      /**
       * It's true if the image gallery for avatar is open
       */
      openAvatar: false,
      /**
       * Default birth day
       */
      defaultBirthday: (props.info && props.info.birthday) ? moment.unix(props.info!.birthday!).toDate() : '',
      /**
       * Seleted birth day
       */
      selectedBirthday: 0,
      /**
       * Web URL
       */
      webUrl: (props.info && props.info.webUrl) ? props.info.webUrl : '',
      /**
       * User company name
       */
      companyName: (props.info && props.info.companyName) ? props.info.companyName : '',
      /**
       * User twitter id
       */
      twitterId: (props.info && props.info.twitterId) ? props.info.twitterId : ''

    }

    // Binding functions to `this`
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleRequestSetAvatar = this.handleRequestSetAvatar.bind(this)
   
  }

  /**
   * Close image gallery of avatar
   */
  handleCloseAvatarGallery = () => {
    this.setState({
      openAvatar: false
    })
  }

  /**
   * Open image gallery of avatar
   */
  handleOpenAvatarGallery = () => {
    this.setState({
      openAvatar: true
    })
  }
  /**
   * Set avatar image url
   */
  handleRequestSetAvatar = (fileName: string,) => {
    this.setState({
      avatar: fileName
    })
  }

  /**
   * Update profile on the server
   *
   *
   * @memberof EditProfile
   */
  handleUpdate = () => {
    const { fullNameInput, tagLineInput, avatar, avatarPath, cityInput, countryInput, selectedBirthday, companyName, webUrl, twitterId } = this.state
    const { info, update } = this.props

    if (fullNameInput.trim() === '') {
      this.setState({
        fullNameInputError: 'This field is required'
      })
    } else {
      this.setState({
        fullNameInputError: ''
      })

      update!({
        fullName: fullNameInput,
        tagLine: tagLineInput,
        avatar: avatar,
        avatarPath: avatarPath,
        companyName: companyName,
        city: cityInput,
        country: countryInput,
        webUrl: webUrl,
        twitterId: twitterId,
        creationDate: this.props.info!.creationDate,
        birthday: selectedBirthday > 0 ? selectedBirthday : ((info && info.birthday) ? info!.birthday! : 0)
      })
    }
  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    console.log(value)
    console.log(target.name)
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  /**
   * Handle resize event for window to change sidebar status
   * @param  {any} event is the event is passed by winodw resize event
   */
  handleResize = (event: any) => {

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

  /**
   * Handle birthday date changed
   */
  handleBirthdayDateChange = (date: any) => {
    this.setState({ selectedBirthday: moment(date).unix() })
  }

  componentDidMount() {
    this.handleResize(null)
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const { classes, translate, currentLanguage } = this.props
    const { defaultBirthday, webUrl, twitterId, companyName } = this.state

    return (

      <div>
        {/* Edit profile dialog */}
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          key='Edit-Profile'
          open={this.props.open!}
          onClose={this.props.onRequestClose}
          fullScreen={true}
        >
          <DialogContent className={classes.dialogContentRoot}>
            <div className='profile__edit'>
              <EventListener
                target='window'
                onResize={this.handleResize}
              />
              <div className='left'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* Avatar */}
                  <div className='g__circle-black' onClick={this.handleOpenAvatarGallery} style={{ zIndex: 1, position: 'absolute', left: '50%', display: 'inline-block', top: '52px', margin: '-18px' }}>
                    <SvgCamera style={{ fill: 'rgba(255, 255, 255, 0.88)', transform: 'translate(6px, 6px)' }} />

                  </div>
                  <UserAvatarComponent fullName={(this.props.info ? this.props.info.fullName : '')} fileName={this.state.avatar} size={90} style={this.styles.avatar} />
                </div>
                <div className='info'>
                  <div className='fullName'>
                    {this.props.fullName}
                  </div>

                </div>
              </div>

            </div>

            {/* Edit user information box*/}
            <Paper style={this.styles.paper} elevation={1}>
              <div style={this.styles.title as any}>{translate!('profile.personalInformationLabel')}</div>
              <div className={classes.boxBorder}>
                <FormControl fullWidth aria-describedby='fullNameInputError'>
                  <InputLabel htmlFor='fullNameInput'>{translate!('profile.fullName')}</InputLabel>
                  <Input id='fullNameInput'
                    onChange={this.handleInputChange}
                    name='fullNameInput'
                    value={this.state.fullNameInput}
                  />
                  <FormHelperText id='fullNameInputError'>{this.state.fullNameInputError}</FormHelperText>
                </FormControl>
              </div>
              <div className={classes.BoxBorder}>
                <FormControl fullWidth aria-describedby='cityInputError'>
                  <InputLabel htmlFor='cityInput'>City</InputLabel>
                  <Input id='cityInput'
                    onChange={this.handleInputChange}
                    name='cityInput'
                    value={this.state.city}
                  />
                  {/* <FormHelperText id='cityInputError'>{this.state.cu}</FormHelperText> */}
                </FormControl>
              </div>
              <div className={classes.BoxBorder}>
                <FormControl fullWidth aria-describedby='countryInputError'>
                  <InputLabel htmlFor='countryInput'>Country</InputLabel>
                  <Input id='countryInput'
                    onChange={this.handleInputChange}
                    name='countryInput'
                    value={this.state.country}
                  />
                  {/* <FormHelperText id='countryInputError'>{this.state.fullNameInput}</FormHelperText> */}
                </FormControl>
              </div>
              <div style={{marginBottom: '-20px'}} className={classes.Boxborder}>
                <FormControl fullWidth aria-describedby='tagLineInputError'>
                  <InputLabel htmlFor='tagLineInput'>{translate!('profile.bio')}</InputLabel>
                  <Input id='tagLineInput'
                    onChange={this.handleInputChange}
                    name='tagLineInput'
                    value={this.state.tagLineInput}
                  />
                  <FormHelperText id='tagLineInputError'>{this.state.fullNameInputError}</FormHelperText>
                </FormControl>
              </div>
              <div className={classes.Boxborder}>
                <TextField
                  className={classes.bottomTextSpace}
                  onChange={this.handleInputChange}
                  name='companyName'
                  value={companyName}
                  label={translate!('profile.companyName')}
                  fullWidth
                />
              </div>
              <div className={classes.Boxborder}>
                <TextField
                  className={classes.bottomTextSpace}
                  onChange={this.handleInputChange}
                  name='twitterId'
                  value={twitterId}
                  label={translate!('profile.twitterId')}
                  fullWidth
                />
              </div>
              <div className={classes.Boxborder}>
                <TextField
                  className={classes.bottomTextSpace}
                  onChange={this.handleInputChange}
                  name='webUrl'
                  value={webUrl}
                  label={translate!('profile.webUrl')}
                  fullWidth
                />
              </div>
              <div style={{paddingTop: '10px'}} className={classes.Boxborder}>
                  <DayPickerInput
                    classNames={{ container: classes.dayPicker, overlay: '' }}
                      value={defaultBirthday}
                      onDayChange={this.handleBirthdayDateChange}
                      formatDate={formatDate}
                      parseDate={parseDate}
                      component={AppInput}
                      format='LL'
                      placeholder={`${moment().format('LL')}`}
                      dayPickerProps={{
                        locale: currentLanguage,
                        localeUtils: MomentLocaleUtils,
                    }}
                  />
              </div>
              <br />

            </Paper>
            <div className={classes.bottomPaperSpace}></div>
          </DialogContent>
          <DialogActions className={classes.fixedDownStickyXS}>
            <Button onClick={this.props.onRequestClose} > {translate!('profile.cancelButton')} </Button>
            <Button variant='contained' color='primary' onClick={this.handleUpdate} style={this.styles.updateButton}> {translate!('profile.updateButton')} </Button>
          </DialogActions>
        </Dialog>

        {/* Image gallery for avatar */}
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          open={this.state.openAvatar}
          onClose={this.handleCloseAvatarGallery}
        >
          <DialogTitle className={classes.dialogTitle}>
            <AppDialogTitle title={translate!('profile.chooseAvatarDialogTitle')} onRequestClose={this.handleCloseAvatarGallery} />
          </DialogTitle>
          <ImageGallery set={this.handleRequestSetAvatar} close={this.handleCloseAvatarGallery} />
        </Dialog>

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
const mapDispatchToProps = (dispatch: any, ownProps: IEditProfileComponentProps) => {
  return {
    update: (info: Profile) => dispatch(userActions.dbUpdateUserInfo(info)),
    onRequestClose: () => dispatch(userActions.closeEditProfile())

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IEditProfileComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'])
  return {
    currentLanguage: getActiveLanguage(state.get('locale')).code,
    translate: getTranslate(state.get('locale')),
    open: state.getIn(['user', 'openEditProfile'], false),
    info: state.getIn(['user', 'info', uid]),
    avatarURL: state.getIn(['imageGallery', 'imageURLList'])

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(EditProfileComponent as any) as any)
