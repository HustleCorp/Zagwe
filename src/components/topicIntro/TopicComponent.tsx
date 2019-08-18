// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// - Import app components
import Img from 'components/img'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// - Import API

import { ItopicIntroComponentProps } from './ItopicIntroComponentProps'
import { ItopicIntroComponentState } from './ItopicIntroComponentState'

import withStyles from '@material-ui/core/styles/withStyles'

const topicStyle = (theme: any) => ({
     topicIntro: {
          paddingBottom: '48px',
          paddingTop: '0px',
      [theme.breakpoints.up('sm')]: {
          paddingBottom: '72px',
          paddingTop: '31px',
          maxWidth: '1320px'
       },

       [theme.breakpoints.down('sm')]: {
          display: 'flex'
        },

         position: 'relative',
         paddingLeft: '12px',
         paddingRight: '12px',
         marginLeft: 'auto',
         marginRight: 'auto',

     },
    pnotr: {
       paddingTop: '16px',
       width: '100%',
       textAlign: 'center'
    },
    body: {
      fontWeight: '700',
      margin: '0, 0, 16px',
      fontSize: '28px',
      lineHeight: '1.25',
      [theme.breakpoints.up('sm')]: {
        fontSize: '46px',
        lineHeight: '1.2'
     },
    },

    bio: {
      fontSize: '15px',
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: '18px'
     },
     [theme.breakpoints.up('md')]: {
      fontSize: '18px'
   },

  },
  text: {
     marginBottom: '24px',
     fontWeight: '400',
     fontSize: '15px',
     [theme.breakpoints.up('sm')]: {
        fontSize: '18px'
     }

  },

})

/**
 * Create component class
 */
export class TopicIntro extends Component<ItopicIntroComponentProps, ItopicIntroComponentState> {

  static propTypes = {

    /**
     * Use for getting url address from server
     */
    fileName: PropTypes.string,
    /**
     * User full name
     */
    fullName: PropTypes.string,
    /**
     * Avatar style
     */
    style: PropTypes.object,
    /**
     * Avatar size
     */
    size: PropTypes.number,
    /**
     * Trigger on touch tap
     */
    onClick: PropTypes.func
    
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ItopicIntroComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    const {classes, title, bio, url  } = this.props
    return (
         <div className={classes.topicIntro}>
           <div className={classes.pnotr}>
            <div>
                <h1 className={classes.body}>
                    {title}
                </h1>
                <div className={classes.bio}>
                  <div>
                    <h2 className={classes.text}>
                        {bio}
                    </h2>
                  </div>
                </div>
            </div>
            <div style={{height: '200px'}}>
              <Img style={{width: '200px', height: '200px', maxWidth: 'none', minWidth: 'auto', position: 'relative'}} fileName={url ? url : ''} />     
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
const mapDispatchToProps = (dispatch: Function, ownProps: ItopicIntroComponentProps) => {
  return {
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ItopicIntroComponentProps) => {
  return {
   
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(topicStyle as any)(TopicIntro as any) as any)
