// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment/moment'

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles"
import LinearProgress from '@material-ui/core/LinearProgress'
// core components
import Card from 'StyledComponents/Card/Card.jsx'
import CardBody from 'StyledComponents/Card/CardBody.jsx'
import Img from 'components/img'

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx"
import { NavLink } from 'react-router-dom'

import UserAvatar from 'components/userAvatar'

import { IfeaturedBoxComponentProps } from './IfeaturedBoxComponentProps'
import { IfeaturedBoxComponentState } from './IfeaturedBoxComponentState'

const styles = (theme: any) => ({
  ...imagesStyles,
  cardTitle: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    marginTop: ".625rem",
    fontSize: "medium",
    height: '49px',
    overflow: 'hidden'
  },
  gridFlow: {
    display: 'flex',
    flexFlow: 'row'
  },
  cardStyle: {
    width: "20rem",
    marginLeft: '0px', 
    marginRight: '15px',
    [theme.breakpoints.up('xs')]: {
        marginLeft: '15px',
        marginRight: '0px',
    }
  },
  cardBody: {
    height: '175px'
  },
  headerName: {
    color: '#4d545d',
    marginTop: '6px',
    marginBottom: '-3px'
  }
})

/**
 * Create component class
 */
export class FeaturedBoxComponent extends Component<IfeaturedBoxComponentProps,IfeaturedBoxComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IfeaturedBoxComponentProps) {
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

    const { classes, post, loaded}  = this.props
    // const rightIconMenu = (
    //   <div>
    //     <IconButton
    //       onClick={this.openPostMenu.bind(this)}
    //     >
    //       <MoreVertIcon />
    //     </IconButton>

    //       <Menu
    //         open={isPostMenuOpen!}
    //         anchorEl={postMenuAnchorEl}
    //         anchorOrigin={{
    //           vertical: 'top',
    //           horizontal: 'right'
    //         }}
    //         transformOrigin={{
    //           vertical: 'top',
    //           horizontal: 'right'
    //         }}
    //         onClose={this.closePostMenu}>
    //         <MenuItem
    //           onClick={() => this.props.toggleDisableComments!(!post.get('disableComments'))} >
    //           {post.get('disableComments') ? translate!('post.enableComments') : translate!('post.disableComments')}
    //         </MenuItem>
    //         {isAdmin ? 
    //           <MenuItem
    //           onClick={() => AdminAPi.addToFeatured(post.get('id'))} >
    //           {'Add to featured'}
    //          </MenuItem>         
    //            : '' }
    //       </Menu>
    //   </div>
    // )
    return (
      <div style={{paddingBottom: '2px'}}>
      <Card className={classes.cardStyle} style={{width: "20rem", marginLeft: '0px', marginRight: '15px'}}>
          <NavLink to={`/posts/${post.get('ownerUserId')}/${post.get('id')}`}>
            <div className='animated-background'>
               <Img fileName={post.get('image')} style={{height: '180px'}} /> 
             </div> 
              {/* <img
                style={{height: "180px", width: "100%", display: "block"}}
                className={classes.imgCardTop}
                src={post.get('image')}
                alt="Card-img-cap"
              /> */}
           </NavLink>
            <CardBody className={classes.cardBody}>
              <div style={{display: 'flex'}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30"viewBox="0 0 172 172"
                   style={{fill: "#000000"}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt"
                    strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none"
                     fontWeight="none" fontSize="none" textAnchor="none"
                      style={{mixBlendMode: "normal"}}><path d="M0,172v-172h172v172z" fill="none">

                        </path><g fill="#d19228"><path d="M74.53333,11.46667c-3.16643,0 -5.73333,2.5669 -5.73333,5.73333c0,28.99347 -40.13333,51.6 -40.13333,91.73333c0,30.48893 33.04404,50.20072 44.67969,51.47683c0.3903,0.08224 0.78811,0.12352 1.18698,0.12317c3.16643,0 5.73333,-2.5669 5.73333,-5.73333c-0.00087,-1.72476 -0.77817,-3.35749 -2.11641,-4.44558c0,-0.00373 0,-0.00746 0,-0.0112c-5.21733,-4.2312 -15.08359,-16.50617 -15.08359,-27.71484c0,-18.39827 17.2,-25.16172 17.2,-25.16172c-9.80973,27.74933 22.33384,31.10217 28.80104,58.5763h0.0112c0.58189,2.62021 2.90371,4.48605 5.58776,4.49036c1.20741,-0.00294 2.38307,-0.38699 3.35938,-1.09739c0.10337,-0.075 0.20421,-0.15343 0.30234,-0.23516c0.93308,-0.60597 25.00495,-16.52664 25.00495,-50.26745c0,-13.775 -6.88956,-37.43579 -11.84739,-47.91589c-0.00409,-0.00866 -0.00711,-0.02496 -0.0112,-0.03359c-0.00372,-0.00747 -0.00745,-0.01494 -0.0112,-0.0224c-0.86395,-2.18853 -2.97733,-3.62704 -5.33021,-3.62812c-2.76275,0.00261 -5.13073,1.97514 -5.63255,4.69192c-0.00001,0.00747 -0.00001,0.01493 0,0.0224c-0.01401,0.06266 -2.64738,11.75767 -11.56745,18.21901c0,-27.01337 -19.50272,-54.91608 -29.78646,-66.45964c-0.15433,-0.20902 -0.32269,-0.40731 -0.50391,-0.59349c-1.0775,-1.11376 -2.55997,-1.74391 -4.10964,-1.74687z"></path></g></g></svg>
                <div style={{color: '#d19228', paddingLeft: '10px', paddingTop: '6px'}}>
                   {'Trending'}
               </div>
              </div>
              <NavLink to={`/posts/${post.get('ownerUserId')}/${post.get('id')}`}>
                  <h4 className={loaded ? classes.cardTitle : 'animated-title'}>
                    {post.get('title')}
                  </h4>
              </NavLink>
            <div style={{display: 'flex', marginLeft: '-12px'}}>
              <div>
                <NavLink to={`users/${post.get('ownerUserId')}/posts`}>
                    <UserAvatar
                      fullName={post.get('ownerDisplayName')} 
                      fileName={post.get('ownerAvatar')} 
                      size={36} />
                  </NavLink>
              </div>
                <div style={{display: 'grid', paddingLeft: '10px'}}>
                    <span className={loaded ? 'featured-name' : 'animated-name'}>
                    {<NavLink to={`/users/${post.get('ownerUserId')}/posts`}>
                      <h6 className={classes.headerName}>
                       {post.get('ownerDisplayName')}
                      </h6>
                      </NavLink>}
                     </span>
                  <div  className={loaded ? 'featured-info' : 'animated-info'} style={{color: '#8b9898'}}>
                  <span>
                    {post.get('creationDate') ? moment.unix(post.get('creationDate')).fromNow() + ' | ' + 'public' : <LinearProgress color='primary' />}
                 </span>
    
                 </div>

                 </div>
            </div>
              
            </CardBody>
          </Card>
      </div>
    )
  }
}

// - Connect component to redux store
export default withStyles(styles as any)(FeaturedBoxComponent as any)
