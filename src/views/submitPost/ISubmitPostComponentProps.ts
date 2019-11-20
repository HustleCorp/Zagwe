import {Comment} from 'core/domain/comments';
import {Post} from 'core/domain/posts/post';
import {Map} from 'immutable';
import {SocialError} from 'src/core/domain/common';
import {FileResult} from 'models/files/fileResult';

export interface ISubmitPostComponentProps {
  /**
   * Router match
   * @type {*}
   * @memberof ISubmitPostComponentProps
   */
  match?: any;

  /**
   * User Identification
   * @type {string}
   * @memberof ISubmitPostComponentProps
   */
  uid?: string;

  /**
   * If post is in edit view
   * @type {boolean}
   * @memeberof ISubmitPostComponentProps
   */
  edit?: boolean;

  /**
   * User avatar address
   *
   * @type {string}
   * @memberof ISubmitPostComponentProps
   */
  ownerAvatar?: string;

  /**
   *  The post owner name
   */
  ownerDisplayName?: string;

  /**
   * Save a post
   *
   * @memberof ISubmitPostComponentProps
   */
  post?: (post: Post, callback: Function) => any;

  /**
   * Post Model object
   */
  EditPost?: Map<string, any>;

  goTo?: (url: string) => any;

  update?: (post: Map<string, any>, callback: Function) => void;

  /**
   * Styles
   */
  classes?: any;

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any;

  /**
   * Upload image to the server
   *
   * @memberof IImageGalleryComponentProps
   */
  uploadImage?: (image: any, imageName: string) => Promise<any>;
}
