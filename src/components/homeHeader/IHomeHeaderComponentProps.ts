import StringAPI from 'api/StringAPI'
export interface IHomeHeaderComponentProps {

  /**
   * User identification
   * 
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  uid?: boolean

  /**
   * Logout user
   *
   * @memberof IHomeHeaderComponentProps
   */
  logout?: () => void

  /**
   * Go to url
   * 
   * @memberof IHomeHeaderComponentProps
   */
  goTo?: (url: string) => void

  /**
   * Handle on resize window event
   *
   * @memberof IHomeHeaderComponentProps
   */
  handleResize?: (event: any) => void

  /**
   * Number of notifications
   *
   * @memberof IHomeHeaderComponentProps
   */
  notifyCount?: number

  /**
   * User full name
   *
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  fullName?: string
  
  /**
   * User's avatar URL address
   *
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  avatar?: string

  /**
   * Top bar title
   *
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  title?: string

  /**
   * Material ui theme style
   */
  classes?: any
    
  /**
   * Theme
   */
  theme?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  openFeedBack?: () => any

  authed?: boolean
}
