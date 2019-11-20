export interface IPostComponentState {
  /**
   * Post text
   */
  text: string;

  /**
   * If it's true, share dialog will be open
   */
  shareOpen: boolean;
  /**
   * If it's true comment will be disabled on post
   */
  disableComments: boolean;

  shareTitle: string;
  /**
   * If it's true, post link will be visible in share post dialog
   */
  openCopyLink: boolean;

  /**
   * Post menu anchor element
   */
  postMenuAnchorEl?: any;

  /**
   * Whether post menu open
   */
  isPostMenuOpen?: boolean;

  /**
   * Url of thumbnails
   */
  thumbUrl: any;
}
