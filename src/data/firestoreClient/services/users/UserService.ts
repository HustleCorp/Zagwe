// - Import react components
import { db } from 'data/firestoreClient'
import moment from 'moment/moment'

import { SocialError } from 'core/domain/common'
import { Profile, UserProvider, OtherProfile } from 'core/domain/users'
import { IUserService } from 'core/services/users'
import { injectable } from 'inversify'

/**
 * Firbase user service
 *
 * @export
 * @class UserService
 * @implements {IUserService}
 */
@injectable()
export class UserService implements IUserService {

  /**
   * Get User Secondary information
   */
  public getUserOther: (userId: string) => Promise<OtherProfile> = (userId) => {
     
     return new Promise<OtherProfile>((resolve, reject) => {
          let userOtherProfileref = db.doc(`otherUserInfo/${userId}`)
          userOtherProfileref.get().then((result) => {
              if (!result.exists) {
              } else {
                  resolve(result.data() as OtherProfile)
              }
          })
        .catch((error: any) => reject(new SocialError(error.code, 'firestore/getUserOther :' + error.message)))
     })
  }

  /**
   * Get user profile
   */
  public getUserProfile: (userId: string)
    => Promise<Profile> = (userId) => {

      return new Promise<Profile>((resolve, reject) => {
        let userProfileRef = db.doc(`userInfo/${userId}`)
        userProfileRef.get().then((result) => {
          if (!result.exists) {
              this.getUserProviderData(userId).then((providerData: UserProvider) => {
              if (!UserProvider || !providerData.email) {
                reject(reject(new SocialError(`firestore/providerdata`, 'firestore/getUserProfile : Provider data or email of provider data is empty!')))
              }
              const {avatar,fullName, email} = providerData
              const userProfile = new Profile(avatar, fullName && fullName !== '' ? fullName : email, '', moment().unix(), email, '', '',  -1, '', '', '', '', 0, 0)
              resolve(userProfile)
              this.updateUserProfile(userId, userProfile)
            })
          } else {
            resolve(result.data() as Profile)
          }

        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/getUserProfile :' + error.message)))
      })
    }

  /**
   * Update User Other
   * 
   */
  public updateUserOtherProfile: (userId: string, otherProfile: OtherProfile) 
        => Promise<void> = (userId, otherProfile) => {
            return new Promise<void>((resolve, reject) => {
                const batch = db.batch()
                const otherProfileRef = db.doc(`otherUserInfo/${userId}`)
                batch.set(otherProfileRef, {...otherProfile})
                batch.commit().then(() => {
                  resolve()
                })
                .catch((error: any) => reject(new SocialError(error.code, 'firestore/updateUserProfile' + error.message)))
            })
        }
    /**
     * Update user profile
     */
  public updateUserProfile: (userId: string, profile: Profile)
    => Promise<void> = (userId, profile) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const profileRef = db.doc(`userInfo/${userId}`)

        batch.set(profileRef,{...profile, id: userId, state: 'active'})
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/updateUserProfile' + error.message)))
      })
    }
  
    /**
     * Get users profile
     */
  public getUsersProfile: (userId: string, lastUserId?: string, page?: number, limit?: number)
    => Promise<{ users: { [userId: string]: Profile }[], newLastUserId: string }> = (userId, lastUserId, page, limit = 10) => {
      return new Promise<{ users: { [userId: string]: Profile }[], newLastUserId: string }>((resolve, reject) => {
        let parsedData: { [userId: string]: Profile }[] = []

        let query = db.collection('userInfo').where('state', '==', 'active')
        if (lastUserId && lastUserId !== '') {
          query = query.orderBy('id').orderBy('creationDate', 'desc').startAfter(lastUserId)
        }
        if (limit) {
          query = query.limit(limit)
        }

        query.get().then((users) => {
          let newLastUserId = users.size > 0 ? users.docs[users.docs.length - 1].id : ''
          users.forEach((result) => {
            const user = result.data() as Profile
            parsedData = [
              ...parsedData,
              {
                [result.id]: {
                  ...user
                }
              }

            ]
          })
          resolve({ users: parsedData, newLastUserId })
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

    /**
     * Get user provider data
     */
  private getUserProviderData = (userId: string) => {
    return new Promise<UserProvider>((resolve,reject) => {
      let userProviderRef = db.doc(`userProviderInfo/${userId}`)
      userProviderRef.get().then((snapshot) => {
        if (snapshot.exists) {
          let userProvider: UserProvider = snapshot.data() as UserProvider 
          resolve(userProvider)
        } else {
          throw new SocialError(`firestore/getUserProviderData/notExist `, `document of userProviderRef is not exist `)
        }
      })
      .catch((error: any) => {
        reject(new SocialError(error.code, 'firestore/getUserProviderData ' + error.message))
      })
    })

  }

}
