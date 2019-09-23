import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTranslate, getOptions} from 'react-localize-redux'
import { push } from 'connected-react-router'
import {Prompt} from 'react-router-dom'
 
import ReactQuill, { Quill } from 'react-quill'
import TagsInput from 'components/tagsComponent'
import 'react-quill/dist/quill.snow.css'
// import 'react-qull/dist/quill.bubble.css'
import { withRouter} from 'react-router-dom'
import {Map, List as ImuList, List} from 'immutable'
import 'react-tagsinput/react-tagsinput.css'
// @material-ui/core components
import { withStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField' 
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

// StyledComponents list
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Question from '@material-ui/icons/ContactSupportOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import { container, defaultFont } from 'assets/jss/material-kit-react.jsx'

// Import actions
import * as postActions from 'store/actions/postActions'
import * as imageGalleryActions from 'store/actions/imageGalleryActions'

// Import types
import {ISubmitPostComponentState} from './ISubmitPostComponentState'
import {ISubmitPostComponentProps} from './ISubmitPostComponentProps'

import uuid from 'uuid'
import FileAPI from 'api/FileAPI'
import {Post} from 'core/domain/posts'
import { Tags, TopicsFUll, TopicsMap, TagsMap }  from 'constants/postType'

// Style Component
import imagesStyle from 'assets/jss/material-kit-react/imagesStyles.jsx'
import { IconButton } from '@material-ui/core'

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
    textAlign: 'right',
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
    title: {
      width: '100%',
      textAlign: 'center',
      display: "inline-block",
      position: "relative",
      marginTop: "30px",
      minHeight: "32px",
      textDecoration: "none",
    },
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  guideLines: {
     width: '100%',
     display: 'flex',
     justifyContent: 'space-between'
  },
  guide: {
    color: '#999',
    textDecoration: 'underline',
  }
})

const KeyCodes = {
  comma: 188,
  enter: 13,
}
 
const delimiters = [KeyCodes.comma, KeyCodes.enter]
// this.props.EditPost && EditPost ? EditPost.get('tags', []) 

export class SubmitPost extends Component<ISubmitPostComponentProps, ISubmitPostComponentState> {
  
  quillRef: any
  reactQuillRef: any
  formats: string[]
  modules: any
  catagories: string []
  _input: HTMLInputElement

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
        TopicsFUll.topic3,
        TopicsFUll.topic4,
        TopicsFUll.topic5,
        TopicsFUll.topic6,
        TopicsFUll.topic7,
        TopicsFUll.topic8,
        TopicsFUll.topic9,
        TopicsFUll.topic10,
        TopicsFUll.topic11,
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

        tags:  [],

        isTagFocus: false,

        tagEditIndex: 0,
        /**
         * Post Title
         */
        postTitle: this.props.edit && EditPost ? EditPost.get('title', '') : '',

        postTopic: this.props.edit && EditPost ? TopicsFUll[TagsMap[EditPost.get('postTopic', '')]] : '',

        postTitleError: '',
        
        postCatagoryError: '',

        postBodyError: '',

        image: this.props.edit && EditPost ? EditPost.get('image', '') : '',

        willSubmit: false,

        imagefullPath: this.props.edit && EditPost ? EditPost.get('imageFullPath', '') : '',

        openDialog: false,
         
        guideOpen: false,

        reqOpen: false,

        currentImage: {}

     }

      this.handleChange = this.handleChange.bind(this)
      this.handleOnBodyChange = this.handleOnBodyChange.bind(this)
      this.handleOnTitleChange = this.handleOnTitleChange.bind(this)
      this.imageHandler = this.imageHandler.bind(this)
      this.handleOnTopicChange = this.handleOnTopicChange.bind(this)
      this.handleOpenDialog = this.handleOpenDialog.bind(this)
      this.handleCloseDialog = this.handleCloseDialog.bind(this)
      this.handleMakeThumb = this.handleMakeThumb.bind(this)
      this.handleOpenGuide = this.handleOpenGuide.bind(this)
      this.handleCloseGuide = this.handleCloseGuide.bind(this)
      this.handleOpenReq = this.handleOpenReq.bind(this)
      this.handleCloseReq = this.handleCloseReq.bind(this)
      this.beforeunload = this.beforeunload.bind(this)
   // Modified Quilljs Modules
     this.modules = {
          toolbar: {
             container: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
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

  handleChange(tags: any) {
    this.setState({tags: tags})
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

  handleOpenDialog () {
    this.setState({openDialog: true})
  }

  handleOpenGuide () {
    this.setState({guideOpen: true})
  }
  handleOpenReq () {
    this.setState({reqOpen: true})
  }
  handleCloseReq () {
    this.setState({reqOpen: false})
  }

  handleCloseGuide () {
    this.setState({guideOpen: false})
  }
  
  handleCloseDialog () {
    this.setState({openDialog: false})
  }

  handleMakeThumb () {
      const res = this.state.currentImage
      this.setState({image: res.fileURL, imagefullPath: res.fileFullPath})
      this.handleCloseDialog()
  }

 imageHandler = (value: boolean) => {
    const {uploadImage} = this.props
    const input: any = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onclick = (e: any ) => {  e.stopPropagation() }
    input.onchange = async ( ) => {
    
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

      this.setState({ currentImage: res })
      this.handleOpenDialog()
      this.quillRef.deleteText(range.index, 1)
      this.quillRef.insertEmbed(range.index, 'image', res.fileURL )
      this.quillRef.setSelection(range.index + 1)

    })
    }
    input.onblur = () => {
      this.handleCloseDialog()
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
    this.setState({postTitleError: ''})
    this.setState({willSubmit: false})
    this.setState({postCatagoryError: ''})
    this.setState({postBodyError: ''})
 
    const {EditPost, edit, update } = this.props

    let error = false 

    const {
      image,
      postBodyHTML,
      imagefullPath,
      postBodyText,
      tags,
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

    if (postTitle.length < 5 || postTitle.length > 80 ) {
       this.setState({postTitleError: 'Title must be more than 5 characters long'})
       error = true
    } else if (!this.catagories.includes(postTopic)) {
       this.setState({postCatagoryError: 'Invalid Catagory'})
       error = true
    } else if (postBodyText.length < 300 && postTopic !== 'Poetry') {
      this.setState({postBodyError: 'Post is too short, please add more content'})
      error = true
    }
    if (!error) {
      if (!edit) {
         this.setState({willSubmit: true})
          if (image !== '') {
             
            FileAPI.getThumbUrl(imagefullPath!).then((url) => {
              if (url) {
                post!({
                   ownerDisplayName: ownerDisplayName,
                   ownerAvatar: ownerAvatar,
                   tags: tags,
                   image: image,
                   thumbImage: url,
                   imageFullPath: imagefullPath,
                   body: postBodyHTML,
                   postTopic: Tags[TopicsMap.get(postTopic)],
                   bodyText: postBodyText.substring(0, 300),
                   title: postTitle,
                   postTypeId: 1,
                   score: 0,
                   viewCount: 0
                 },(postId: string) => {goTo!(`/posts/${uid}/${postId}`)})

               } else {
                post!({
                    ownerDisplayName: ownerDisplayName,
                    ownerAvatar: ownerAvatar,
                    tags: tags,
                    image: image,
                    thumbImage: '',
                    imageFullPath: imagefullPath,
                    body: postBodyHTML,
                    postTopic: Tags[TopicsMap.get(postTopic)],
                    bodyText: postBodyText.substring(0, 300),
                    title: postTitle,
                    postTypeId: 1,
                    score: 0,
                    viewCount: 0
                  }, (postId: string) => {goTo!(`/posts/${uid}/${postId}`)})  
               }
            })
            } else {
               post!({
                ownerDisplayName: ownerDisplayName,
                ownerAvatar: ownerAvatar,
                body: postBodyHTML,
                tags: tags,
                bodyText: postBodyText.substring(0, 300),
                image: '',
                thumbImage: '',
                imageFullPath: '',
                postTopic: Tags[TopicsMap.get(postTopic)],
                title: postTitle,
                postTypeId: 0,
                score: 0,
                viewCount: 0
            }, (postId: string) => {goTo!(`/posts/${uid}/${postId}`)})
        }

      } else {
        this.setState({willSubmit: true})
        FileAPI.getThumbUrl(imagefullPath!).then((url) => {
         if (url) {
          const updatedPost = EditPost!.set('body', postBodyHTML)
          .set('bodyText', postBodyText)
          .set('tags', tags)
          .set('title', postTitle)
          .set('image', image)
          .set('thumbImage', url)
          .set('postTopic', Tags[TopicsMap.get(postTopic)])
          .set('imageFullPath', imagefullPath)
          .set('postTypeId', 1)
  
          update!(updatedPost, (postId: string) => {goTo!(`/posts/${uid}/${postId}`)})

         } else {
    
            const updatedPost = EditPost!.set('body', postBodyHTML)
            .set('bodyText', postBodyText)
            .set('tags', tags)
            .set('title', postTitle)
            .set('image', '')
            .set('imageFullPath', imagefullPath)
            .set('postTopic', Tags[TopicsMap.get(postTopic)])
            
            update!(updatedPost, (postId: string) => {goTo!(`/posts/${uid}/${postId}`)})

         }
        })
       
      }
    }
    
  }

    handleDelete(i: number) {
    const { tags } = this.state
    this.setState({
         tags: tags.filter((tag, index) => index !== i),
         })
      }

      handleAddition(tag: any) {
          const ad = this.state.tags
          this.setState({ tags: [...this.state.tags, tag] })
      }

      // handleDrag(tag, currPos, newPos) {
      //     const tags = [...this.state.tags];
      //     const newTags = tags.slice();

      //     newTags.splice(currPos, 1);
      //     newTags.splice(newPos, 0, tag);

      //     // re-render
      //     this.setState({ tags: newTags });
      // }

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
    window.addEventListener('beforeunload', this.beforeunload, true)
  
  }

  componentDidUpdate() {
     this.attachQuillRefs()
    
  }

  componentWillUnmount () {
    window.removeEventListener('beforeunload', this.beforeunload, true)
  }

  beforeunload(event: any) {
    if (this.state.postBodyHTML !== '' || this.state.postTitle !== '') {
      event.preventDefault()
      event.returnValue = true
    }
  }
  renderTag = (props: any) => {
    const { isTagFocus } = this.state
    const { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props

    return (
    <span key={key} {...other} onBlur={() => { this.setState({ isTagFocus: false }) }}>
      { <span onClick={() => { this.setState({ isTagFocus: true }) }}>
          {getTagDisplayValue(tag)}
        </span>}
        {!disabled && <a className={classNameRemove} onClick={(e) => { onRemove(key) }}></a>}
    </span>)
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
    const error = this.state.postTitleError.trim() !== '' || this.state.postCatagoryError.trim() !== '' 
    if (error) {
      this._input.focus()
    }
    return (
            <div className={classes.submitPostContent}>
              <Prompt
                when={(this.state.postBodyHTML !== '' || this.state.postTitle !== '') &&  this.state.willSubmit === false}
                message={'Are you sure you want to leave the page? any unsaved items will be lost'}
              />
                  <div className={classes.editorTitle}>
                      <h3>
                        <TextField
                                id="post-title"
                                label="Title"
                                placeholder='title'
                                inputProps={{ref: (c: any) => this._input = c}}
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
                        autoFocus={this.state.postCatagoryError.trim() !== ''}
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

                   <div style={{color: 'red'}}>
                       {this.state.postBodyError.trim() !== '' ? 'Post is too short, please add more content' : ''}
                   </div>
                     <ReactQuill
                       ref={(el) => {this.reactQuillRef = el}}
                       theme='snow'
                       placeholder="Write here"
                       value={this.state.postBodyHTML}
                       formats={this.formats}
                       modules={this.modules}
                       onChange={this.handleOnBodyChange}/>
                  
                  <div className={classes.guideLines}>
                  <a>
                  <div style={{paddingTop: '10px', display: 'flex'}}>
                     <TagsInput value={this.state.tags} maxTags={10} onChange={this.handleChange} initval={this.props.edit && this.props.EditPost ? this.props.EditPost.get('tags', '') : List([])} />
                     <div >
                      <Tooltip title={'Tags help make your posts more discoverable and show up in searchs more frequently'}>
                        <IconButton>
                            <Question/>
                        </IconButton>
                      </Tooltip>
                     </div>
                  </div>
                   <div className={classes.guide} onClick={this.handleOpenGuide}>
                       {'Post submission FAQ and tips'}
                   </div>
                   </a>
                   
                    <div className={classes.button} >
                    {/* <a>
                      <div className={classes.guide} onClick={this.handleOpenReq}>
                        {'Submission Guidelines'}
                      </div>
                      </a> */}
                      <Button
                         variant="outlined"
                         color="primary"
                         style={{marginTop: '10px'}}
                         onClick={this.submitPost} >
                           Submit
                      </Button>
                    </div>

                 </div>

                 <Dialog
                  open={this.state.guideOpen}
                  // onClose={handleClose}
                  // PaperComponent={PaperComponent}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogContent>
                    <DialogContentText>

                        <h3>  Can I post on Zagwe even if I am not a professional writer?  </h3>

                        <p> YES. Zagwe is a platform for anyone who wants to share their written work, whether you are a professional writer or took up writing as a hobby, you are welcome to contribute. </p>

                        <h3>  How can my posts show on the trending list? </h3>

                        <p> Trending posts are the posts that have the most views and engagement. Check for any grammar and spelling mistakes before you submit your post. Include a featured image with your posts for better appeal and engage with your audience </p>

                        <h3>  How can I increase my followers and expand my reach on Zagwe? </h3>

                        <p> 
                          Find more Zagwe followers under the 'Discover' page. Share the link to your Zagwe posts on your other social media platforms (facebook, twitter…) to encourage your friends and family to join and follow you! You can invite your contacts to join Zagwe from your profile.
                        </p>

                        <h3> I can’t find a category that fits my work. What should I do?
                        </h3>

                        <p> 
                        For any posts that don't fit the categories listed, you can submit the post under the 'Other' category. The Zagwe team will add new categories if enough posts are made.

                        </p>

                        <h3>How can I reach a member of the Zagwe team? </h3>

                        <p> 
                        If you have any feedback, we would love to hear from you via our feedback form. For any other questions or concerns, contact us at info@Zagwe.io.
                        </p>

                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseGuide} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={this.state.reqOpen}
                  // onClose={handleClose}
                  // PaperComponent={PaperComponent}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogContent>
                    <DialogContentText>
                      <p>
                         Zagwe’s main purpose is to promote both informative and creative Ethiopian writing. Violence, harassment, online trolling, 
                         and other similar types of behavior ultimately diminish the value that the platform brings, and as such, all users are obliged
                         to follow the submission guidelines outlined below. Accounts or posts who fail to do so will be suspended and their posts taken down.
                       </p>
                       <h3> Hate speech: </h3>
                       <p>
                        You may not use Zagwe’s services to express prejudice against a particular group on the basis of ethnicity, religion, or sexual orientation.
                        </p>

                        <h3> Misinformation/ disinformation: </h3>
                        <p>
                          You may not spread false or biased information - with or without the intent to mislead.
                        </p>
                          
                        <h3>Copyright: </h3>
                        
                        <p>
                        You may not violate others’ intellectual property rights. Impersonation and 'fan pages' who post the work of a contributor without their knowledge and consent are also prohibited.
                        </p>
                        <h3>
                        Ethnic violence and extremism:
                        </h3>
                        <p>
                        You may not use Zagwe’s services for the purpose of spreading ethnic violence or ideologies of ethnic extremism. Zagwe is committed to maintaining a safe space and takes this matter seriously.
                        </p>
                        <h3>
                        Sensitive media: 
                        </h3>
                        <p>
                        You may not submit posts that include graphic or adult content excessively. Posts depicting sexual violence and/or assault are also not permitted.
                        </p>
                        <h3>
                        Abuse/ Harassment:
                        </h3>
                        <p>
                        You may not engage in the targeted harassment of someone due to their gender, profession, or their posts on Zagwe including any prior written work.
                        </p>
                       
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseReq} color="primary">
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>

                 <Dialog
                  open={this.state.openDialog}
                  // onClose={handleClose}
                  // PaperComponent={PaperComponent}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogContent>
                    <DialogContentText>
                       Would you like to have this image as your front cover?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button  onClick={this.handleMakeThumb} color="primary">
                      Yes
                    </Button>
                    <Button onClick={this.handleCloseDialog} color="primary">
                      No
                    </Button>
                  </DialogActions>
                </Dialog>

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