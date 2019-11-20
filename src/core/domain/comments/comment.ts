import {BaseDomain} from 'core/domain/common';

export class Comment extends BaseDomain {
  /**
   * Comment identifier
   */
  public id?: string | null;

  /**
   * Post identifier that comment belong to
   */
  public postId: string;

  /**
   * Comment text
   */
  public text?: string | null;

  /**
   * Comment upvote
   */
  public upvote?: number | null;

  /**
   *  Comment downvote
   */
  public downvote?: number | null;

  /**
   * List of upvoter identifier
   *
   * @type {{[voterId: string]: boolean}}
   * @memberof Comment
   */
  upvoted?: {[voterId: string]: boolean};

  /**
   * List of downvote identifier
   *
   * @type {{[voterId: string]: boolean}}
   * @memberof Comment
   */
  downvoted?: {[voterId: string]: boolean};

  /**
   * Comment creation date
   */
  public creationDate?: number;

  /**
   * Comment owner full name
   */
  public userDisplayName?: string;

  /**
   * Comment owner avater address
   */
  public userAvatar?: string;

  /**
   * Comment owner identifier
   */
  public userId?: string;
}
