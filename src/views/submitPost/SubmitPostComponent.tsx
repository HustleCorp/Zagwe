import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTranslate, getOptions} from 'react-localize-redux'
import { push } from 'connected-react-router'

import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { withRouter} from 'react-router-dom'
import {Map, List as ImuList} from 'immutable'
// @material-ui/core components
import { withStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// StyledComponents list
import Input from '@material-ui/core/Input'
import CustomButton from 'StyledComponents/CustomButtons/Button.jsx'

import { container, title, defaultFont, boxShadow } from 'assets/jss/material-kit-react.jsx'

// Import actions
import * as postActions from 'store/actions/postActions'
import * as imageGalleryActions from 'store/actions/imageGalleryActions'

// Import types
import {ISubmitPostComponentState} from './ISubmitPostComponentState'
import {ISubmitPostComponentProps} from './ISubmitPostComponentProps'

import uuid from 'uuid'
import FileAPI from 'api/FileAPI'
import {Post} from 'core/domain/posts'
import { Tags, TopicsFUll, TopicsMap }  from 'constants/postType'

// Style Component
import imagesStyle from 'assets/jss/material-kit-react/imagesStyles.jsx'

const styles = (theme: Theme) => ({
  container,

  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
      marginTop: '50px'
    }
  },
  postTopic: {
    paddingBottom: '20px',
    paddingLeft: '4px',
    marginTop: '-17px'

  },
  submitPostContent: {
    marginTop: '55px',
     ...container,
     boxSizing: 'border-box'
  },
  editorTitle: {
        width: '85%',
        margin: '-0.2em 0.6em 1em 0.0em',
  },
  editorContent: {
    border: 'none',
    padding: '-0.2em -0.4em 1em -0.8em',
    margin: '-0.2em 0em 1em 0em',
    ...defaultFont,
    backgroundColor: 'inherit',
    overflowX: 'hidden',
    overflowY: 'auto',
    
  },
  button: {
    textAlign: 'right'
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  
  name: {
    marginTop: '-80px'
  },
  ...imagesStyle,
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3'
  },

  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
})

export class SubmitPost extends Component<ISubmitPostComponentProps, ISubmitPostComponentState> {
  
  quillRef: any
  reactQuillRef: any
  formats: string[]
  modules: any
  catagories: string []

  /**
   * Component Constructor
   * @param {object} props is an object properties of component
   */
  constructor (props: ISubmitPostComponentProps) {

      super(props)

      this.quillRef = null // Quill instance
      this.reactQuillRef = null  // ReactQuill component
      const { EditPost } = props

      this.catagories = [
        TopicsFUll.topic2,
        TopicsFUll.topic3,
        TopicsFUll.topic4,
        TopicsFUll.topic5,
        TopicsFUll.topic6,
        TopicsFUll.topic7,
        TopicsFUll.topic8,
      ]
      // Default state
      this.state = {

        /**
         * Post Body HTML
         */
        postBodyHTML: this.props.edit && EditPost ? EditPost.get('body', '') : '',
        /**
         * PostBodyText
         */
        postBodyText: this.props.edit && EditPost ? EditPost.get('bodyText', '') : '', 
        /**
         * Post Title
         */
        postTitle: this.props.edit && EditPost ? EditPost.get('title', '') : '',

        postTopic: this.props.edit && EditPost ? EditPost.get('title', '') : '',

        postTitleError: '',
        
        postCatagoryError: '',

        image: this.props.edit && EditPost ? EditPost.get('image', '') : '',

        imagefullPath: this.props.edit && EditPost ? EditPost.get('imageFullPath', '') : '',

     }
     
      this.handleOnBodyChange = this.handleOnBodyChange.bind(this)
      this.handleOnTitleChange = this.handleOnTitleChange.bind(this)
      this.imageHandler = this.imageHandler.bind(this)
      this.handleOnTopicChange = this.handleOnTopicChange.bind(this)
      
   // Modifired Quilljs Modules
     this.modules = {
          toolbar: {
             container: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}], 
              [{ 'align': 'center'}, { 'align': 'justify'} ],
              ['link', 'image'],
             ],
             handlers: {
               image: this.imageHandler
            },
            clipboard: {
               matchVisual: true,
           }
          }
    }

      // Modified QuillJs Formats
    this.formats = [
        'header',
        'bold', 'italic', 'underline', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image'
      ]
  
  }

  /**
   * When the body of the post has changed
   * @param {string}content is the new body of the post
   */
  handleOnBodyChange(content: string) {
    this.setState({
      
      postBodyHTML: content, 
      postBodyText: this.quillRef ? this.quillRef.getText() : '', })
  }

  handleOnTopicChange(event: any) {
     this.setState({postTopic: event.target.value})
  }
  
  /**
   * When the title of the post has changed
   * @param event is an event passed by the post callback
   */
  handleOnTitleChange(event: any) {
    this.setState({postTitle: event.target.value})
    
  }

 imageHandler = () => {
   
    const {uploadImage} = this.props
    const input: any = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {

      const extension: any = FileAPI.getExtension(input.files[0].name)
      let fileName = (`${uuid()}.${extension}`)
      FileAPI.constraintImage(input.files[0], fileName).then(async (result) => {   

      // Save current cursor state
      const range = this.quillRef.getSelection(true)
      
      // Insert temporary loading placeholder image
      this.quillRef.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`)
      
      // Move cursor to right side of image
      this.quillRef.setSelection(range.index + 1)
      
      // upload image
      const res = await uploadImage!(result._resizedImage, result._fileName)
  
      this.setState({image: res.fileURL, imagefullPath: res.fileFullPath})
      
      this.quillRef.deleteText(range.index, 1)

      this.quillRef.insertEmbed(range.index, 'image', res.fileURL )

    })
    }
  }

  /**
   * CallBack for the submit button
   */
  submitPost = () => {
    // const {ops} = this.quillRef.getContents()
    // const imageAction = ops.find((item) => {
      
    //     return item.insert && item.insert.image
    // } )
    
    const {EditPost, edit, update } = this.props

    let error = false 

    const {
      image,
      postBodyHTML,
      imagefullPath,
      postBodyText,
      postTopic,
      postTitle,
    } = this.state

    const {
      uid,
      ownerAvatar,
      ownerDisplayName,
      post,
      goTo
    }  = this.props

    if (postTitle.length < 5 ) {
       this.setState({postTitleError: 'Title must be more than 5 characters long'})
       error = true
    } else if (!this.catagories.includes(postTopic)) {
       this.setState({postCatagoryError: 'Invalid Catagory'})
       error = true

    }
    if (!error) {
      if (!edit) {
          if (image !== '') {
            post!({
              ownerDisplayName: ownerDisplayName,
              ownerAvatar: ownerAvatar,
               image: image,
               imageFullPath: imagefullPath,
               body: postBodyHTML,
               postTopic: Tags[TopicsMap.get(postTopic)],
               bodyText: postBodyText,
               title: postTitle,
               postTypeId: 1,
               score: 0,
               viewCount: 0
             }, ( ) => {goTo!(`/${uid}/posts/`)})
            } else {
               post!({
                ownerDisplayName: ownerDisplayName,
                ownerAvatar: ownerAvatar,
                body: postBodyHTML,
                bodyText: postBodyText,
                postTopic: Tags[TopicsMap.get(postTopic)],
                title: postTitle,
                postTypeId: 0,
                score: 0,
                viewCount: 0
            }, () => {goTo!(`/${uid}/posts/`)})
        }

      } else {

        const updatedPost = EditPost!.set('body', postBodyHTML)
        .set('bodyText', postBodyText)
        .set('title', postTitle)
        .set('image', image)
        .set('imageFullPath', imagefullPath)

        update!(updatedPost, () => {goTo!(`/${uid}/posts/`)})

      }
    }
    
  }

  /**
   * Attach to the Quill component
   */
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') { return }
    this.quillRef = this.reactQuillRef.getEditor()
  }

  /**
   * Get Quill Instance on mounting
   */
  componentDidMount() {
    this.attachQuillRefs()
    
  }

  componentDidUpdate() {
     this.attachQuillRefs()
    
  }

  render() {

    /**Import the stylesheet
     * Componenet constructor
     * @param {object} props
     * 
     */
    const { classes,  translate , } = this.props
   
    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    }
    
    return (
            <div className={classes.submitPostContent}>
                  <div className={classes.editorTitle}>
                      <h3>
                        <TextField
                                id="post-title"
                                label="Title"
                                placeholder='title'
                                helperText={this.state.postTitleError}
                                error={this.state.postTitleError.trim() !== ''}
                                className={classes.editorTitle}
                                value={this.state.postTitle}
                                onChange={this.handleOnTitleChange}
                                margin="normal"
                              />   
                        </h3>
                  </div>
                  <div className={classes.postTopic}>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                      error={this.state.postCatagoryError.trim() !== ''}
                      htmlFor="select-multiple">Catagory</InputLabel>
                      <Select
                        value={this.state.postTopic}
                        onChange={this.handleOnTopicChange}
                        input={<Input id="select-multiple" />}
                        MenuProps={MenuProps}
                      >
                        {this.catagories.map(catagory => (
                          <MenuItem key={catagory} value={catagory} >
                            {catagory}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                  
                     <ReactQuill
                       ref={(el) => {this.reactQuillRef = el}}
                       theme='snow'
                       placeholder="Write here"
                       value={this.state.postBodyHTML}
                       formats={this.formats}
                       modules={this.modules}
                       onChange={this.handleOnBodyChange}/>
                  </div>

                  <div>
                    <div className={classes.button} >
                    <CustomButton 
                      color="primary" 
                      round
                      onClick={this.submitPost}
                      >
                      Submit</CustomButton>
                    </div>
                
                 </div>
            </div>
    )
  }
 
}
/**
 * Map dispatch to props
 * @param {func} dispatch is the funtction to dispatch action to reducers
 * @param {object} ownProps props belonging to the component
 * @return {object}  props of component
 */
const mapDispatchToprops = (dispatch: any, ownProps: ISubmitPostComponentProps) => {
  return {
    post: (post: Post, callBack: Function) => dispatch(postActions.dbAddImagePost(post, callBack)),
    goTo: (url: string) => dispatch(push(url)),
    uploadImage: (image: any, imageName: string) => dispatch(imageGalleryActions.dbUploadImagePost(image,imageName)),
    update: (post: Map<string, any>, callBack: Function) => dispatch(postActions.dbUpdatePost(post, callBack)),
  }

}

/**
 * Map state to props
 * @param {object} state is the object from the redux store
 * @param {object} ownProps is the props belonging to the component
 * @return {object}
 */
const mapStateToProps = ( state: Map<string, any> , ownProps: ISubmitPostComponentProps) => {
     const {postId, userId} = ownProps.match.params
     const EditPost = state.getIn(['post', 'userPosts', userId, postId])
     const edit: boolean = EditPost ? true : false
     const uid = state.getIn(['authorize', 'uid'])
     const user = state.getIn(['user', 'info', uid], {})
     return {
       translate: getTranslate(state.get('locale')),
       uid: uid,
       EditPost,
       edit: edit,
       ownerAvatar: user.avatar || '',
       ownerDisplayName: user.fullName || ''
     }
}

export default withRouter(connect(mapStateToProps, mapDispatchToprops)(withStyles(styles as any)(SubmitPost as any) as any) as any) as any