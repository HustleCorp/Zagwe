// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Password from '@material-ui/icons/Security'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import config from 'src/config'
import { localize } from 'react-localize-redux'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { ILoginComponentProps } from './ILoginComponentProps'
import { ILoginComponentState } from './ILoginComponentState'
import { OAuthType } from 'src/core/domain/authorize'
import Grid from '@material-ui/core/Grid/Grid'
import CommonAPI from 'api/CommonAPI'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20
  },
  contain: {
    margin: '0 auto'
  },
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: 'center',
    display: 'block',
    margin: 'auto',
    backgroundColor: 'inherit'
  },
  margin: {
    // padding: '15px',
    // margin: '4px',
    border: '1px solid rgba(0, 0, 0, 0)'
  },
  bottomPaper: {
    display: 'inherit',
    fontSize: 'small',
    marginTop: '50px'
  },
  link: {
    color: '#0095ff',
    display: 'inline-block'
  },
  textSocial: {
     paddingLeft: '10px',
     color: '#4267b2'
  },
  textGoogle: {
     paddingLeft: '10px',
     color: '#db4437'
  },
  textLogin: {
    paddingLeft: '10px',
    color: '#64db37e8',
 }
})

// - Create Login component class
export class LoginComponent extends Component<ILoginComponentProps, ILoginComponentState> {

  styles = {
    singinOptions: {
      paddingBottom: 10,
      justifyContent: 'space-around',
      display: 'grid',
    },
    divider: {
      marginBottom: 10,
      marginTop: 15
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ILoginComponentProps) {
    super(props)

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInputError: ''
    }

    // Binding function to `this`
    this.handleForm = this.handleForm.bind(this)

  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })

    switch (name) {
      case 'emailInput':
        this.setState({
          emailInputError: ''
        })
        break
      case 'passwordInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })

        break
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {
    const { translate } = this.props
    let error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: translate!('login.emailRequiredError')
      })
      error = true

    }
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: translate!('login.passwordRequiredError')
      })
      error = true

    }

    if (!error) {
      this.props.login!(
        this.state.emailInput,
        this.state.passwordInput
      )
    }

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes, loginWithOAuth, translate } = this.props

    const OAuthLogin = (
      <div style={this.styles.singinOptions as any}>
       
        <Button variant="outlined" size="medium"  className={classes.margin}  onClick={() => loginWithOAuth!(OAuthType.FACEBOOK)}>
           <div className='icon-fb icon'></div> <div className={classes.textSocial}>Login With Facebook</div>
        </Button>
        <Button variant="outlined" size="small" color="primary" className={classes.margin}  onClick={() => loginWithOAuth!(OAuthType.GOOGLE)} >
             <div className='icon-google icon'></div> <div className={classes.textGoogle}>Login With Google</div>
        </Button>
      </div>
    )

    return (
      <Grid  spacing={24}>
        <Grid item xs={12} className={classes.contain}>
        {/* <h1 className='web_app'>{config.settings.appName}</h1> */}
        <div className='web_app'>
           <img  style={{width: 'auto'}} src='/Zagwe.jpeg' alt="Smiley face" height="35" width="35Y"></img>
        </div>
          <div className='animate-bottom'>
            <Paper className={classes.paper} elevation={1} >
              <form>
                <div style={{ padding: '48px 40px 36px' }}>
                  <div style={{
                    paddingLeft: '40px',
                    paddingRight: '40px'
                  }}>

                    <h2 className='zoomOutLCorner animated g__paper-title'>{translate!('login.title')}</h2>
                  </div>
                  {config.settings.enabledOAuthLogin ? OAuthLogin : ''}
                
                  <Divider style={this.styles.divider} />
                  <TextField
                    className={classes.textField}
                    autoFocus
                    onChange={this.handleInputChange}
                    helperText={this.state.emailInputError}
                    error={this.state.emailInputError.trim() !== ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    name='emailInput'
                    label={translate!('login.emailLabel')}
                    type='email'
                    tabIndex={1}
                  /><br />
                  <TextField
                    className={classes.textField}
                    autoComplete="current_password"
                    onChange={this.handleInputChange}
                    helperText={this.state.passwordInputError}
                    error={this.state.passwordInputError.trim() !== ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Password/>
                        </InputAdornment>
                      ),
                    }}
                    name='passwordInput'
                    label={translate!('login.passwordLabel')}
                    type='password'
                    tabIndex={2}
                  /><br />
                  <br />
                  <br />
                  <div className='login__button-box'>
                    <div>
                    <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={this.props.signupPage} >
                          <div className={classes.textLogin}>{translate!('login.createAccountButton')}</div>
                        </Button>
                    </div>
                    <div >
                      <Button variant='contained' color='primary' onClick={this.handleForm} tabIndex={3} >{translate!('login.loginButton')}</Button>
                    </div>
                  </div>
                  <span className={classes.bottomPaper}>{translate!('login.forgetPasswordMessage')} <NavLink to='/resetPassword' className={classes.link}>{translate!('login.resetPasswordLabel')}</NavLink></span>
                </div>
              </form>
            </Paper>
          </div>
        </Grid>
      </Grid>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: ILoginComponentProps) => {
  return {
    login: (email: string, password: string) => {
      dispatch(authorizeActions.dbLogin(email, password))
    },
    loginWithOAuth: (type: OAuthType) => dispatch(authorizeActions.dbLoginWithOAuth(type)),
    signupPage: () => {
      dispatch(push('/signup'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any, ownProps: ILoginComponentProps) => {
  return {
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(localize(LoginComponent as any, 'locale', CommonAPI.getStateSlice) as any) as any)) as typeof LoginComponent
