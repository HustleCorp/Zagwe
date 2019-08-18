export interface IImgComponentProps {

  /**
   * Image file name
   *
   * @type {string}
   * @memberof IImgComponentProps
   */
  fileName: string

  /**
   * Image style sheet
   *
   * @type {{}}
   * @memberof IImgComponentProps
   */
  style?: {}

  outerStyle?: {}

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
  
  height?: any

  className?: any
   
  loadedClassName?: any

  loadingClassName?: any
}
