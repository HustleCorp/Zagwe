import { LanguageType } from 'store/reducers/locale/langugeType'

export const environment = {
  firebase: {
    apiKey: 'AIzaSyB2-FTYuSv0JpKQpjFN_wVpSfTNoA4oKV4',
    authDomain: 'publishing-3965e.firebaseapp.com',
    databaseURL: 'https://publishing-3965e.firebaseio.com/',
    projectId: 'publishing-3965e',
    storageBucket: 'publishing-3965e.appspot.com',
    messagingSenderId: '99571061006'
  },
  settings: {
    enabledOAuthLogin: true,
    appName: 'ገጠመኝ',
    defaultProfileCover: 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
    defaultLanguage: LanguageType.English
  },
  theme: {
    primaryColor: '#9c27b0',
    secondaryColor: '#4d545d'
  }
}