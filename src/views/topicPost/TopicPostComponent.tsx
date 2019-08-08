// - Import react components
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Map, merge } from 'immutable'
// - Import app components
import { withStyles } from '@material-ui/core/styles'
import StreamComponent from 'views/stream'
import TopicIntro from 'src/components/topicIntro'

import { Tags, TopicsFUll } from 'constants/postType'
// - Import API

import Loadable from 'react-loadable'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'
// - Import actions
import * as postActions from 'store/actions/postActions'

import { ITopicPostComponentProps as ITopicPostComponentProps } from './ITopicPostComponentProps'
import { ITopicPostComponentState as ITopicPostComponentState } from './ITopicPostComponentState'

// - Async Components
const AsyncStream = Loadable({
  loader: () => import('views/stream'),
  loading: MasterLoadingComponent,
  delay: 300
})

const topicstyle = (theme: any) => ({
  topicStream: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
   },
  },
  topicDesc: {
    [theme.breakpoints.up('sm')]: {
      width: '35%',
    },
   },
   stream: {
     [theme.breakpoints.up('sm')]: {
        width: '65%',
    },

   }

})
/**
 * Create component class
 */
export class TopicPostComponent extends Component<ITopicPostComponentProps,ITopicPostComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ITopicPostComponentProps) {
    super(props)
    
    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

    }

    componentWillMount () {
      const {tag, loadFollowData, loadTopicData} = this.props
      if (tag === 'following') {
            loadFollowData!()
      } else {
         console.log('loading topic data')
         loadTopicData!()
      }
    }
  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    const title = () => {
        const {tag} = this.props
        switch (tag as string) {
          case `${Tags.topic1}`: 
            return (
                    <TopicIntro title={`${TopicsFUll.topic1}`} 
                    bio={'Posts from people you follow'} 
                    url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Ffollowmin.jpg?alt=media&token=f5ea1b0b-f9d2-411f-a113-a8d09ce88ae8'}
                              />
                   )
            break
          case `${Tags.topic2}`: 
            return (
                  <TopicIntro title={`${TopicsFUll.topic2}`}
                    bio={'Your daily dose of reality'} 
                    url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Fgetemegn.jpg?alt=media&token=bb94927b-ae33-4055-af1b-984a10e82fa2'}
                    />
                    )
            break
          case `${Tags.topic3}`:
              return (
                <TopicIntro title={`${TopicsFUll.topic3}`}
                  bio={'Covering the latest important events and movements from around the world.'} 
                  url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Fpolitics.jpg?alt=media&token=3cbe445e-88f3-4910-b1dd-ac87e27145d0'}
                  />
                  )
            break
          case `${Tags.topic4}`: 
            return (
                  <TopicIntro title={`${TopicsFUll.topic4}`}
                    bio={"Insight into Ethiopia's world of work and Entrepreneurship"} 
                    url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Fbusiness.jpg?alt=media&token=bfaa65bb-aa78-46bd-a3d8-cd6f7dfd1b27'}
                    />
                    )
            break
          case `${Tags.topic5}`: 
            return (
                  <TopicIntro title={`${TopicsFUll.topic5}`}
                    bio={'`Newest tech developments in Ethiopia and the rest of the world'} 
                    url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Ftech.jpg?alt=media&token=7ddbaf66-f8d6-4161-8778-edddfd7e8399'}
                    />
                    )
            break
          case `${Tags.topic6}`: 
            return (
                  <TopicIntro title={`${TopicsFUll.topic6}`}
                    bio={'Amharic and English poems for your soul'} 
                    url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Fpoem.jpg?alt=media&token=44db241d-25fa-41e1-887c-60be442580d3'}
                    />
                    )
            break
          case `${Tags.topic7}`: 
            return (
                  <TopicIntro title={`${TopicsFUll.topic7}`}
                    bio={'Where observation meet imagination'} 
                    url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Fteret.jpg?alt=media&token=26bc5e62-14c4-4cb3-8bd6-d1f1077ca110'}
                    />
                    )
            break
            case `${Tags.topic8}`: 
            return (
                  <TopicIntro title={`${TopicsFUll.topic8}`}
                    bio={'Be original'} 
                    url={'https://firebasestorage.googleapis.com/v0/b/publishing-3965e.appspot.com/o/topics%2Frandommin.jpg?alt=media&token=c56ee5c6-ae2a-4e3c-b90d-5fdff730bd9c'}
                    />
                    )
            break
          
          default: 
            break
        }
      }                    
    const {classes, mergedPosts, hasMorePosts, tag, loadDataStream } = this.props
    console.log(mergedPosts)
   
    const St = AsyncStream 
    return (
      <div className={classes.topicStream}>
        <div className={classes.topicDesc}>
           {title()}
         </div>
         <div className={classes.stream}>
              <St
                posts={mergedPosts}
                loadStream={loadDataStream}
                hasMorePosts={hasMorePosts}
                />
        </div>
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
const mapDispatchToProps = (dispatch: any, ownProps: ITopicPostComponentProps) => {
  const {tag} = ownProps.match.params
  return {
     loadFollowData: () => dispatch(postActions.dbGetFollowingPosts()),
     loadTopicData:  () => dispatch(postActions.dbGetPostbyTopic(tag)),
     loadDataStream: tag === 'following' ?  () => dispatch(postActions.dbGetFollowingPosts()) : () => dispatch(postActions.dbGetPostbyTopic(tag))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ITopicPostComponentProps) => {
  const {tag} = ownProps.match.params
  const {uid} = state.getIn(['authorize', 'uid'], {})
  let hasMorePosts: boolean = false
  let mergedPosts = Map({})

  if (tag === 'following') {
      const Posters: Map<string, any> = state.getIn(['post', 'following'], {})
      const posts = state.getIn(['post', 'following', uid ], {})
      
      Posters.forEach((user, userId) => {
        let newPosts = state.getIn(['post', 'following', userId], {})
        mergedPosts = mergedPosts.merge(newPosts)
      })
      mergedPosts = mergedPosts.merge(posts)
      hasMorePosts = state.getIn(['post', 'stream', 'following', 'hasMoreData' ], true)
  
  } else {
        const Posters: Map<string, any> = state.getIn(['post', tag], {})
       
          Posters.forEach((user, userId) => {
            let newPosts = state.getIn(['post', tag, userId], {})
            mergedPosts = mergedPosts.merge(newPosts)
           })
  
        hasMorePosts = state.getIn(['post', 'stream', tag, 'hasMoreData'], true)     
  }
  
  return {
    tag,
    hasMorePosts,
    mergedPosts,
  
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(topicstyle as any)((TopicPostComponent as any)))
