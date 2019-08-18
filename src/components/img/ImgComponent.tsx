// - Import react components
import React, { Component } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LazyLoad from 'react-lazy-load'
import { connect } from 'react-redux'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'
import { withStyles } from '@material-ui/core/styles'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { Map } from 'immutable'

// - Import app components

// - Import API

// - Import actions
import { IImgComponentProps } from './IImgComponentProps'
import { IImgComponentState } from './IImgComponentState'

const styles = (theme: any) => ({
  image: {
    verticalAlign: 'top',
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%'
  }
})

/**
 * Create component class
 */
export class ImgComponent extends Component<IImgComponentProps,IImgComponentState> {

  styles = {
    loding: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100px',
      position: 'relative',
      color: '#cacecd',
      fontWeight: 400
    },
    loadingContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    loadingImage: {
      fill: 'aliceblue',
      width: '50px',
      height: '50px'
    }
  }
  
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IImgComponentProps) {
    super(props)

    // Defaul state
    this.state = {
      isImageLoaded: false
    }

    // Binding functions to `this`
    this.handleLoadImage = this.handleLoadImage.bind(this)

  }

  /**
   * Will be called on loading image
   *
   * @memberof Img
   */
  handleLoadImage = () => {
    this.setState({
      isImageLoaded: true
    })
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    let { fileName, style} = this.props
    let { isImageLoaded } = this.state
    const {classes} = this.props

    return (
      <div>
        <LazyLoad
            debounce={false}
            offsetVertical={500}>
          <div className='img-container'>
           <img className={isImageLoaded ? 'img-loaded' : 'img-loading'}  onLoad={this.handleLoadImage} src={fileName || ''} style={isImageLoaded ? style : { display: 'none' }} />
         </div>
        </LazyLoad>
        
{/*   
        <div style={Object.assign({},{ backgroundColor: 'white' }, isImageLoaded ? { display: 'none' } : this.styles.loding)}>
          <div style={this.styles.loadingContent as any}>
            <SvgImage style={{...style, color: '#444'}} />
          </div>
        </div>  */}
 
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
const mapDispatchToProps = (dispatch: any, ownProps: IImgComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IImgComponentProps) => {
  return {
    translate: getTranslate(state.get('locale')),
    avatarURL: state.getIn(['imageGallery', 'imageURLList']),
    imageRequests: state.getIn(['imageGallery', 'imageRequests'])
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ImgComponent as any)as any)
