// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, List as ImuList } from 'immutable'

import * as postActions from 'store/actions/postActions'

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles"
import ScrollRight from "@material-ui/icons/ArrowForwardIos"
import ScrollLeft from '@material-ui/icons/ArrowBackIos'
// core components
import FeaturedBox from 'src/components/featuredBox'

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx"

import { IfeaturedComponentProps } from './IfeaturedComponentProps'
import { IfeaturedComponentState } from './IfeaturedComponentState'

import { Post } from 'src/core/domain/posts'

const styles = (theme: any) => ({
  ...imagesStyles,
  cardTitle: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    marginTop: ".625rem",
    height: '49px'
  },
  gridFlow: {
    display: 'flex',
    flexFlow: 'row'
  },
  scrollElement: {
     verticalAlign: 'middle'

  },
  scrollContainer: {
    lineHeight: '340px',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
   }
  }
})

/**
 * Create component class
 */
export class FeaturedComponent extends Component<IfeaturedComponentProps,IfeaturedComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IfeaturedComponentProps) {
    super(props)

        // Defaul state
    this.state = {

      scrollPosition: 0,
      
      featuredWidth: window.innerWidth

    }

        // Binding functions to `this`
      this.featuredPostList = this.featuredPostList.bind(this)
      this.scrollRight = this.scrollRight.bind(this)
      this.scrollLeft = this.scrollLeft.bind(this)
      this.updateDimensions = this.updateDimensions.bind(this)

  }

  featuredPostList = () => {
    let posts: Map<string, Map<string, any>> = this.props.featuredPosts!
          if (posts === undefined ) {
            return  (
              <h1>
                  'No featured post'
              </h1>
            )
        } else {
          let postBack: Post[] = []
          let parsedPosts: ImuList<any> = ImuList()
          posts.forEach((post: Map<string, any>) => {
            if (post!.get('image') !== '') {
              parsedPosts = parsedPosts.push(post)
            } 
          }) 
          let index = 0
          parsedPosts.forEach((post) => {
              let newPost: any = (
                  <div key={`${post!.get('id')!}-featured-div`}>
                      <FeaturedBox key={`${post!.get('id')!}-featured-div`} post={post! as any}/>
                  </div>
              )
              postBack.push(newPost as never)
                  
          })
          return(postBack)
        }   
  }

  scrollRight () {
    let elem = this.props.elem
    const scrollVal = this.state.scrollPosition
    if (elem) {
      elem.scrollLeft = scrollVal + 200
      this.setState({scrollPosition: elem.scrollLeft})
    }
   
  }
   
  scrollLeft () {
    let elem = this.props.elem
    const scrollVal = this.state.scrollPosition
    if (elem) {
      elem.scrollLeft = scrollVal - 200
      this.setState({scrollPosition: elem.scrollLeft})
    }
  }
  
  componentWillMount () {
      const { loadFeatured } = this.props
      loadFeatured!()
  }
  
  updateDimensions() {
      this.setState({featuredWidth: window.innerWidth})

  }

  /**
   * Add event listenerDOMContentLoaded
   */
  componentDidMount() {
    const elem = document.getElementById('featuredList')!
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
    if (elem) {
      elem.scrollLeft = 150
    }
    this.setState({scrollPosition: elem.scrollLeft})

  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
   
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {

    const { classes, container }  = this.props
    const featuredWidth = this.state.featuredWidth
    const postList = this.featuredPostList() as Post[] | any

    const scrollVal = this.state.scrollPosition
    let overflow = false
    if (featuredWidth < 1675 ) {
       overflow = true
    }
    return (
          <div id='topContainer'>
               <div style={{display: 'flex'}}>
               <div style={{display: scrollVal > 0 ? 'inline-block' : 'none'}} className={classes.scrollContainer}>
                  <div className={classes.scrollElement}>
                    <ScrollLeft  onClick={this.scrollLeft}/>
                  </div>
               </div>
                <div key={'featuredGrid'} id='featuredList' className='grid_overflow grid__1of4 grid__space-between custom-scroll featured-grid'>
                {postList}
               </div>
               <div className={classes.scrollContainer}>
                 <div style={{display: overflow ? 'inline-block' : 'none' }} className={classes.scrollElement} >
                     <ScrollRight  onClick={this.scrollRight}/>   
                 </div>
               </div>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IfeaturedComponentProps) => {
  return {
     loadFeatured: () => dispatch(postActions.dbGetFeaturedPosts())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IfeaturedComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  const featuredPosts: Map<string, any> = state.getIn(['post', 'featuredPosts'], {})
  let elem = document.getElementById('featuredList') 
  let container = document.getElementById('topContainer')
  return {
    uid,
    featuredPosts,
    elem,
    container,
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(FeaturedComponent as any))
