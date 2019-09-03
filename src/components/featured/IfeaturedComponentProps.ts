import { User } from 'core/domain/users'
import { UserTie } from 'core/domain/circles'
import {Map} from 'immutable'

export interface IfeaturedComponentProps {

 /**
  * in-line style component
  */
  classes?: any
  
  loadFeatured?: () => any

  featuredPosts?: Map<string, Map<string, any>>

  elem: any

  container: any
  
  // has featued posts loaded
  loaded?: boolean

}
