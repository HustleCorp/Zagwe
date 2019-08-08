
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

    /**
     * Post Title
     */
    postTitle: string

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
}
