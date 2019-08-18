export interface IPostPageComponentState {
   /** 
    * If it's true comment will be disabled on post
    */
    disableComments: boolean

    shareTitle: string

   /**
    * If it's true, post link will be visible in share post dialog
    */
    openCopyLink: boolean

   /**
    * Post menu anchor element
    */
   postMenuAnchorEl?: any

   /**
    * Whether post menu open
    */
    isPostMenuOpen?: boolean

    shareOpen?: boolean

}
