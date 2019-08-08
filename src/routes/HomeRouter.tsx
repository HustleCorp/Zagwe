// - Import react components
import PrivateRoute from './PrivateRoute'
import  { db } from 'data/firestoreClient'
import React, {lazy, Suspense, Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Loadable from 'react-loadable'
import { Map } from 'immutable'

import { IRouterProps } from './IRouterProps'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'
import SubmitPost from 'views/submitPost'
import { PublicRoute } from './PublicRoute'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/socialEngine'
import { IUserTieService } from 'src/core/services/circles'

const userTieService: IUserTieService = provider.get<IUserTieService>(SocialProviderTypes.UserTieService)

// - Async Components
const AsyncStream = Loadable({
  loader: () => import('views/stream'),
  loading: MasterLoadingComponent,
  delay: 300
})

const AsyncProfile = Loadable({
  loader: () => import('views/profile'),
  loading: MasterLoadingComponent,
  delay: 300
})

const AsyncPostPage = Loadable({
  loader: () => import('views/postPage'),
  loading: MasterLoadingComponent,
  delay: 300
})

const AsyncPeople = Loadable({
  loader: () => import('views/people'),
  loading: MasterLoadingComponent,
  delay: 300
})

const AsyncTopic =  Loadable({
  loader: () => import('views/topicPost'),
  loading: MasterLoadingComponent,
  delay: 300
})

const profileModify: any =  ( ) => {
  return new Promise<void>((resolve, reject) => {
       const ref = db.collection('users')
       ref.get().then(async (snapshot) => {
             snapshot.forEach((doc) => {
               let followersCount = 0
               let followingCount = 0
                userTieService.getUserTieSender(doc.id).then((result) => {
                    followersCount = Object.keys(result).length
                     console.log('followersCount', '=', followersCount)
                     db.collection('userInfo').doc(doc.id).update({followersCount: followersCount})
                })
                userTieService.getUserTies(doc.id).then((result) => {
                    followingCount = Object.keys(result).length
                    db.collection('userInfo').doc(doc.id).update({followingCount: followingCount})
                })
             })
       })
  })
} 

const addCollection: any =  ( ) => {
    const ref = db.collection('posts')
    ref.get().then(async (snapshot) => {
          snapshot.forEach((doc) => {
               ref.doc(doc.id).set({postTopic: ''}, {merge: true})
            
          })
    })     
}

/**
 * Home Router
 */

export class HomeRouter extends Component<IRouterProps, any> {

   render () {
     const { enabled, match, data, translate } = this.props
     const Sub = SubmitPost 
     const St = AsyncStream
    return (
          enabled ? (
          <Switch>
            <Route path='/people/:tab?' component={AsyncPeople} />
            <Route path='/t/:tag?' component={AsyncTopic}/>
            <PrivateRoute path='/submit/:userId?/:postId?'  component={
              (<div>
                       <Sub edit={false}/>
              </div>)} />
          
            <PrivateRoute path='/tag/:tag' component={(
            <div> 
                  <St homeTitle={`#${match.params.tag}`} posts={data.mergedPosts} />
              </div>
            )} />
           
            <Route path='/:userId/posts/:postId/:tag?' component={AsyncPostPage} />
            <Route path='/:userId/:tab?' component={AsyncProfile} />
         
          <PublicRoute  path='/' component={(
            <div>
                <St
                  posts={data.mergedPosts}
                  loadStream={data.loadDataStream}
                  hasMorePosts={data.hasMorePosts}
                  />
            </div>
                )} />
         
          </Switch>
          )
          : ''
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IRouterProps) => {

  return {}

}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IRouterProps) => {
  return {
    translate: getTranslate(state.get('locale')),
    currentLanguage: getActiveLanguage(state.get('locale')).code,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeRouter as any) as any) as typeof HomeRouter
