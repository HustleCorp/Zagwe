// - Import react components
import React, { Suspense, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes, { number } from 'prop-types'
import { grey,} from '@material-ui/core/colors'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { Map, List as ImuList } from 'immutable'

// - Import app components
const PostComponent = React.lazy(() => import('components/post'))

import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress'

// - Import API
import * as PostAPI from 'src/api/PostAPI'

// - Import actions
import * as globalActions from 'src/store/actions/globalActions'

import { IStreamComponentProps } from './IStreamComponentProps'
import { IStreamComponentState } from './IStreamComponentState'
import { Post } from 'src/core/domain/posts'

// - Create StreamComponent component class
export class StreamComponent extends Component<IStreamComponentProps, IStreamComponentState> {
  static propTypes = {
    
    /**
     * A list of post
     */
    posts: PropTypes.object,

    /**
     * The title of home header
     */
    homeTitle: PropTypes.string

  }

  styles = {
    postWritePrimaryText: {
      color: grey[400],
      cursor: 'text'
    },
    postWtireItem: {
      fontWeight: '200'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IStreamComponentProps) {
    super(props)
    this.state = {
      /**
       * It's true if we want to have two column of posts
       */
      divided: false,
      /**
       * If it's true comment will be disabled on post
       */
      disableComments: this.props.disableComments!,
      /**
       * If it's true share will be disabled on post
       */
      disableSharing: this.props.disableSharing!,

      count: 0,
      
      /**
       * If there is more post to show {true} or not {false}
       */
      hasMorePosts: true,

      postList: Map({})

    }

    // Binding functions to `this`
    this.postLoad = this.postLoad.bind(this)

  }

  /**
   * Create a list of posts
   * @return {DOM} posts
   */
  postLoad = () => {

      let { match } = this.props
      let posts: Map<string, Map<string, any>> = this.state.postList
      const {loaded} = this.props
  
      let { tag } = match.params
      if (posts === undefined || !(posts.keySeq().count() > 0)) {
  
        return  []

      } else {
        
        let postBack: {divided: boolean, oddPostList: Post[], evenPostList: Post[]} = { divided: false, oddPostList: [], evenPostList: [] }
        let parsedPosts: ImuList<any> = ImuList()
        posts.forEach((post: Map<string, any>) => {
          
        parsedPosts = parsedPosts.push(post)
        
        })
        
        const sortedPosts = PostAPI.sortImuObjectsDate(parsedPosts)
        // if (sortedPosts.count() > 6) {
        //   postBack.divided = true
  
        // } else {
        //   postBack.divided = false
        // }
        let index = 0
        sortedPosts.forEach((post) => {
          index++
          
          let newPost: any = (
            <div key={`${index}-stream-div`}>
  
              {index > 1 || (!postBack.divided && index > 0) ? <div style={{ height: '2px' }}></div> : ''}
                 <Suspense fallback={''}>
                    <PostComponent loaded={loaded} tag={tag} key={`${index}-stream-div-post`} post={post! as any} />
                 </Suspense>
             
            </div>
          )
  
          if ((index % 2) === 1 && postBack.divided) {
            postBack.oddPostList.push(newPost as never)
          } else {
          
            postBack.evenPostList.push(newPost as never)
          }
          ++index
        })
         return(postBack)
      }
    }
   
  /**
   * Scroll loader
   */
  scrollLoad = () => {
     const { loadStream } = this.props
     loadStream!()
  }

  componentWillMount() {
    const { loadInitial } = this.props
    this.setState({postList: this.props.posts})
    if (loadInitial) {
        this.props.loadStream!()
     }
   }
   componentWillReceiveProps(nextProps: IStreamComponentProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setState({postList: nextProps.posts})
    }
   }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const {  hasMorePosts } = this.props
    
    const tag = this.props.match.params.tag
    const postList = this.postLoad() as any
    
    return (
          <InfiniteScroll
            dataLength={this.state.postList.size}
            next={this.scrollLoad}
            hasMore={hasMorePosts!}
            loader={<LoadMoreProgressComponent key='stream-load-more-progress' />}
          >
            <div className={`grid grid__gutters grid__1of2 ${tag ? 'grid__left' : 'grid__center'} animate-top`}>
              <div className='grid-cell animate-top' style={{ maxWidth: '700px', minWidth: '400px', paddingLeft: '0px'}}>
            
                {postList.evenPostList}
                <div style={{ height: '0px' }}></div>
              </div>
              {postList.divided
                ? (<div className='grid-cell animate-top' style={{ maxWidth: '530px', minWidth: '530px' }}>
                  <div className='blog__right-list'>
                    {postList.oddPostList}
                    <div style={{ height: '0px' }}></div>
                  </div>
                </div>)
                : ''}
    
            </div>
    
          </InfiniteScroll>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IStreamComponentProps) => {
  return {
    setHomeTitle: () => dispatch(globalActions.setHeaderTitle(ownProps.homeTitle || '')),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading())

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IStreamComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'])
  const user = state.getIn(['user', 'info', uid])
  const loaded = state.getIn(['post', 'loaded'], false)
  return {
    translate: getTranslate(state.get('locale')),
    avatar: user ? user.avatar : '',
    loaded: loaded,
    fullName: user ? user.fullName : ''
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StreamComponent as any) as any) as typeof StreamComponent
