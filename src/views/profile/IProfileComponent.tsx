// - Import react components
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components
import ProfileHeader from 'src/components/profileHeader'
import StreamComponent from 'views/stream'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'

// - Import API

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'
import { IProfileComponentProps } from './IProfileComponentProps'
import { IProfileComponentState } from './IProfileComponentState'
import { Profile, OtherProfile } from 'core/domain/users'
import { NavLink } from 'react-router-dom'

const styles = (theme: any) => ({
    userNav: {
        marginBottom: '24px',
        display: 'flex',
        lineHeight: '32px',
        verticalAlign: 'middle',
        justifyContent: 'space-evenly'
    },
    indiv: {
        paddingLeft: '0',
        pointerEvents: 'on',
        display: 'inline-block',
        textDecoration: 'none',
        minWidth: '94px',
        padding: '0px, 6px',
        [theme.breakpoints.up('md')]: {
            padding: '0px 12px',
            minWidth: 'auto'
        }

    },
    spanNum: {
         fontSize: '18px',
         lineHeight: '1',
         display: 'block',
         [theme.breakpoints.up('md')]: {
             display: 'inline-block',
             paddingRight: '7px'
        },
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
    }

})
// - Async Components
const AsyncHeader = Loadable({
  loader: () => import('components/profileHeader'),
  loading: MasterLoadingComponent,
  delay: 300
})

/**
 * Create component class
 */
export class ProfileComponent extends Component<IProfileComponentProps,IProfileComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IProfileComponentProps) {
    super(props)

    // Default state
    this.state = {

    }

    // Binding functions to `this`
    this.loadPost = this.loadPost.bind(this)
  }

  loadLikePost = () => {
    const St = StreamComponent as any
    
    const { likedPosts, loadUserLikePosts  } = this.props
    return (
          <St
            posts={likedPosts}
            loadStream={(var1: any, var2: any) => { }}
            hasMorePosts={false}
            loadComponentWillMount={loadUserLikePosts}
           />
        )
  }

  loadPost = () => {
        const St = StreamComponent as any
        const {posts, loadPosts, hasMorePosts} = this.props
        return  (
               <St
                posts={posts}
                loadStream={loadPosts}
                hasMorePosts={hasMorePosts}
                />
  )}

   componentWillMount () {
    this.props.loadPosts()
    this.props.loadUserInfo()
    this.props.loadUserOther()
  }
  
  componentDidMount () {
    // const {loadUserLikePosts} = this.props
    // loadUserLikePosts!()
    window.scrollTo(0,0)
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    /**
     * Component styles
     */
    const styles = {
      profile: {
        marginTop: '55px'
      },
      header: {

      },
      content: {

      },
      showcover: {
        height: '450px'
      },
      avatar: {
        border: '2px solid rgb(255, 255, 255)'
      }
    }
   
   const { translate, userId, classes, tab, posts, followingCount, followersCount, likes, likeCount, userProfile, authed} = this.props
    return (
      <div style={styles.profile}>
        <div style={styles.header}>
          <AsyncHeader tagLine={this.props.tagLine} avatar={this.props.avatar} isAuthedUser={this.props.isAuthedEdit!}
              city={this.props.city}     country={this.props.country} level={this.props.level}
              banner={this.props.banner} fullName={this.props.name} 
              company={this.props.company} twitterId={this.props.twitterId}
              userId={this.props.userId}  website={this.props.website}
              authed={this.props.authed} followersCount={followersCount}
              followingCount={followingCount} userInfo={userProfile!}/>
        </div>
        <div style={styles.content}>
          <div className='profile__title'>
              <div className={classes.userNav}>
                <span>
                   <div>
                      <NavLink to={`/users/${userId}/posts`} className={classes.indiv} style={{color: tab === 'posts' ? '#111' : '#999'}}> 
                          <span className={classes.spanNum}>
                              {posts ? posts.size : 0}
                            </span>
                            <span className={classes.spanValue}>
                              posts
                            </span>
                      </NavLink>
                      <NavLink to={`/users/${userId}/likes`} className={classes.indiv} style={{color: tab === 'likes' ? '#111' : '#999'}}>
                          <span className={classes.spanNum}>
                              {likes ? likeCount : 0}
                            </span>
                            <span className={classes.spanValue}>
                              likes
                            </span>

                      </NavLink>
       
                   </div> 
                </span>
              </div>
          </div>  
      </div>
      <div style={{ height: '24px' }}></div>

      {tab === 'posts'
        ? ( posts ? 
            this.loadPost() :  (<div className='profile__title'>{translate!('profile.nothingSharedLabel')} </div>)
          )

        : (likes.length > 0 ? <div>
               {this.loadLikePost()} 
           </div> : 
           <div className='profile__title'>
                {translate!('profile.nothingLikedLabel')}
            </div>)
        }

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
const mapDispatchToProps = (dispatch: any, ownProps: IProfileComponentProps) => {
  const { userId } = ownProps.match.params
  return {
    loadPosts: () => dispatch(postActions.dbGetPostsByUserId(userId)),
    loadUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(userId, 'header')),
    loadUserOther: () => dispatch(userActions.dbGetUserOtherInfoByUserId(userId, 'header')),
    loadUserLikePosts: () => dispatch(postActions.dbGetLikedPosts(userId))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IProfileComponentProps) => {
  const { userId , tab} = ownProps.match.params
  const authed = state.getIn(['authorize', 'authed'], false)
  const uid = state.getIn(['authorize', 'uid'], 0)
  const hasMorePosts = state.getIn(['post', 'profile', 'hasMoreData'])
  const posts = state.getIn(['post', 'userPosts', userId])
  const userProfile = state.getIn(['user', 'info', userId], {}) as Profile
  const likedPosts = state.getIn(['post', 'likedPosts'])
  const otherProfile = state.getIn(['user', 'otherInfo', userId], {}) as OtherProfile
  return {
    translate: getTranslate(state.get('locale')),
    tab,
    authed,
    avatar: userProfile.avatar,
    name: userProfile.fullName, 
    tagLine: userProfile.tagLine,
    website: userProfile.webUrl,
    company: userProfile.companyName,
    twitterId: userProfile.twitterId,
    city: userProfile.city,
    country: userProfile.country,
    isAuthedEdit: userId === uid,
    likedPosts:  likedPosts, 
    followingCount: userProfile.followingCount,
    followersCount: userProfile.followersCount,
    userProfile: userProfile,
    level: userProfile.level,
    likes: otherProfile.likes || [],
    likeCount: otherProfile.likeCount || 0,
    userId,
    posts,
    hasMorePosts

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ProfileComponent as any))
