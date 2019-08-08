import { BaseDomain } from 'core/domain/common'

export class Profile extends BaseDomain {
  constructor (
    public avatar: string,
    public fullName: string,
    public tagLine: string,
    public creationDate: number,
    public email?: string | null,
    public country?: string | null,
    public city?: string | null,
    public birthday?: number,
    public webUrl?: string,
    public avatarPath?: string,
    public companyName?: string,
    public twitterId?: string,
    public followingCount?: number,
    public followersCount?: number, 
  ) {
    super()

  }

}
