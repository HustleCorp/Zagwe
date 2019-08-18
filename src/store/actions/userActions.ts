// - Import react components
import { provider } from 'src/socialEngine'
import { Map } from 'immutable'

// - Import domain
import { Profile } from 'src/core/domain/users'
import {OtherProfile} from 'src/core/domain/users'
import { SocialError } from 'src/core/domain/common'

// - Import action types
import { UserActionType } from 'constants/userActionType'

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { IUserService } from 'src/core/services/users'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'

/**
 * Get service providers
 */
const userService: IUserService = provider.get<IUserService>(SocialProviderTypes.UserService)

/* _____________ CRUD DB _____________ */

/**
 * Get user info from database
 */
export const dbGetUserInfo = () => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    if (uid) {
      return userService.getUserProfile(uid).then((userProfile: Profile) => {
        dispatch(addUserInfo(uid, {
          avatar: userProfile.avatar,
          avatarPath: userProfile.avatarPath,
          email: userProfile.email,
          fullName: userProfile.fullName,
          tagLine: userProfile.tagLine,
          country: userProfile.city,
          city: userProfile.city,
          creationDate: userProfile.creationDate,
          birthday: userProfile.birthday,
          companyName: userProfile.companyName,
          webUrl: userProfile.webUrl,
          twitterId: userProfile.twitterId,
          followingCount: userProfile.followingCount,
          followersCount: userProfile.followersCount,
        }))
      })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

    }
  }
}

export const dbGetUserOther = () => {
   return (dispatch: any, getState: Function) => {
       const state: Map<string, any> = getState()
       let uid: string = state.getIn(['authorize', 'uid'])
       if (uid) {
          return userService.getUserOther(uid).then((otherUserProfile: OtherProfile) => {
               dispatch(addUserOther(uid, {likes:
                 otherUserProfile.likes}))
          })
          .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))
       }
   }
}

/***
 * Get user Secondary information
 */           
export const dbGetUserOtherInfoByUserId = (uid: string, callerKey: string) => {
     console.log('I am inside the function')
     return (dispatch: Function, getState: Function) => {
         if (uid) {
            const state: Map<string, any> = getState()
            let caller = state.getIn(['global', 'temp', 'caller'])
            return userService.getUserOther(uid).then((otherUserProfile: OtherProfile) => {
                 dispatch(addUserOther(uid, {
                      likes: otherUserProfile.likes
                 }))
            }).catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))
         }
     }
}

/**
 *  Get user info from database
 */
export const dbGetUserInfoByUserId = (uid: string, callerKey: string) => {
  return (dispatch: Function, getState: Function) => {
    if (uid) {

      const state: Map<string, any>  = getState()
      let caller = state.getIn(['global', 'temp', 'caller'])
      if ( caller && caller.indexOf(`dbGetUserInfoByUserId-${uid}`) > -1) {
        return undefined
      }
      dispatch(globalActions.temp({caller: `dbGetUserInfoByUserId-${uid}`}))
      return userService.getUserProfile(uid).then((userProfile: Profile) => {

        dispatch(addUserInfo(uid, {
          avatar: userProfile.avatar,
          avatarPath: userProfile.avatarPath,
          email: userProfile.email,
          fullName: userProfile.fullName,
          tagLine: userProfile.tagLine,
          country: userProfile.country,
          city: userProfile.city,
          creationDate: userProfile.creationDate,
          birthday: userProfile.birthday,
          companyName: userProfile.companyName,
          webUrl: userProfile.webUrl,
          twitterId: userProfile.twitterId,
          followingCount: userProfile.followingCount,
          followersCount: userProfile.followersCount,
        }))

        switch (callerKey) {
          case 'header':
            dispatch(globalActions.setHeaderTitle(userProfile.fullName))

            break

          default:
            break
        }
      })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

    }
  }
}

export const dbUpdateUserOther = (newOther: OtherProfile) => {

  return (dispatch: any, getState: Function) => {
    const state: Map<string, any> = getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    let OtherProfile: OtherProfile = state.getIn(['user', 'otherInfo', uid])
    let updatedProfile: OtherProfile = {
        likes: newOther.likes || OtherProfile.likes || []
    }
    console.log(updatedProfile)

    return userService.updateUserOtherProfile(uid, updatedProfile).then(() => {
         dispatch(updateUserOther(uid, updatedProfile))
    }).catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))
  }}

/**
 * Updata user information
 * @param {object} newInfo
 */
export const dbUpdateUserInfo = (newProfile: Profile) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    let profile: Profile = state.getIn(['user', 'info', uid])
    let updatedProfile: Profile = {
      avatar: newProfile.avatar || profile.avatar || '',
      email: newProfile.email || profile.email || '',
      fullName: newProfile.fullName || profile.fullName || '',
      tagLine: newProfile.tagLine || profile.tagLine || '',
      birthday: newProfile.birthday || profile.birthday || 0,
      companyName: newProfile.companyName || profile.companyName || '',
      webUrl: newProfile.webUrl || profile.webUrl || '',
      city: newProfile.city || profile.city || '',
      country: newProfile.country || profile.country ||  '',
      twitterId: newProfile.twitterId || profile.twitterId ||  '',
      creationDate: profile.creationDate,
      followersCount: profile.followersCount || 0,
      followingCount: profile.followingCount || 0,
    }
    return userService.updateUserProfile(uid,updatedProfile).then(() => {

      dispatch(updateUserInfo(uid, updatedProfile))
      dispatch(closeEditProfile())
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }

}

// - Get people info from database
export const dbGetPeopleInfo = (page: number, limit: number) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  = getState()
    const people: Map<string, any> = state.getIn(['user', 'people'])
    const lastPageRequest = people.get('lastPageRequest')
    const lastUserId = people.get('lastUserId')

    let uid: string = state.getIn(['authorize', 'uid'])

    if (uid && lastPageRequest !== page) {

      return userService.getUsersProfile(uid, lastUserId, page, limit).then((result) => {
        if (!result.users || !(result.users.length > 0)) {
          return dispatch(notMoreDataPeople())
        }
        // Store last user Id
        dispatch(lastUserPeople(result.newLastUserId))

        let parsedData: Map<string, Profile> = Map({})
        result.users.forEach((user) => {
          const userId = Object.keys(user)[0]
          const userData = user[userId]
          parsedData = parsedData.set(userId, userData)
        })
        dispatch(addPeopleInfo(parsedData))
      })
        .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

    }
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add user information
 */
export const addUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.ADD_USER_INFO,
    payload: { uid, info }
  }
}

/**
 * 
 *  Add user seconday information
 */
export const addUserOther = (uid: string, info: OtherProfile) => {
    return {
        type: UserActionType.ADD_USER_OTHER,
        payload: {uid, info}
    }
}

/**
 * Add people information
 */
export const addPeopleInfo = (infoList: Map<string, Profile>) => {
  return {
    type: UserActionType.ADD_PEOPLE_INFO,
    payload: infoList
  }
}

/**
 * Update user information
 */
export const updateUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.UPDATE_USER_INFO,
    payload: { uid, info }
  }
}

export const updateUserOther = (uid: string, info: OtherProfile) => {
  return {
     type: UserActionType.UPDATE_USER_OTHER,
     payload: {uid, info}
  }
}

export const clearAllData = () => {
  return {
    type: UserActionType.CLEAR_ALL_DATA_USER
  }
}

/**
 * Open edit profile
 */
export const openEditProfile = () => {
  return {
    type: UserActionType.OPEN_EDIT_PROFILE
  }

}

/**
 * Close edit profile
 */
export const closeEditProfile = () => {
  return {
    type: UserActionType.CLOSE_EDIT_PROFILE
  }

}

/**
 * Set profile posts has more data to show
 */
export const hasMoreDataPeople = () => {
  return {
    type: UserActionType.HAS_MORE_DATA_PEOPLE
  }

}

/**
 * Set profile posts has not data any more to show
 */
export const notMoreDataPeople = () => {
  return {
    type: UserActionType.NOT_MORE_DATA_PEOPLE
  }

}

/**
 * Set last page request of profile posts
 */
export const requestPagePeople = (page: number) => {
  return {
    type: UserActionType.REQUEST_PAGE_PEOPLE,
    payload: { page}
  }

}

/**
 * Set last user identification of find people page
 */
export const lastUserPeople = (lastUserId: string) => {
  return {
    type: UserActionType.LAST_USER_PEOPLE,
    payload: { lastUserId}
  }

}
