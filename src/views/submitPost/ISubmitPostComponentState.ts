
export interface ISubmitPostComponentState {
   
    /**
     * Post body
     */
    postBodyHTML: string

    /**
     * Post body Text
     */
    postBodyText: string

    postTopic: string

    tags: string []

    currentImage: any

    isTagFocus: boolean

    tagEditIndex: number

    /**
     * Post Title
     */
    postTitle: string

    willSubmit: boolean

    /**
     * Url of image location
     */
    image?: string

    /**
     *  location of image on firebase
     */
    imagefullPath?: string

    /**
     * Has thumNail been generated
     */
    
    /**
     *  Post Title Error
     */
    postTitleError: string

    postCatagoryError: string

    postBodyError: string

    openDialog: boolean

    guideOpen: boolean

    reqOpen: boolean
}
