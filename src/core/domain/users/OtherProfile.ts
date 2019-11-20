import {BaseDomain} from 'core/domain/common';

/**
 * Secondary information on user
 */
export class OtherProfile extends BaseDomain {
  constructor(public likes: string[], public likeCount: number) {
    super();
  }
}
