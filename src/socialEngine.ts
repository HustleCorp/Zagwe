import { useFirestore } from './data/firestoreClient/dependecyRegisterar'
import { Container } from 'inversify'
import CommonAPI from 'api/CommonAPI'

/**
 * Developer tools
 */
window['console']['trace'] = CommonAPI.logger

/**
 * Initialize container
 */
export const provider = new Container()

/**
 * Register dependencies
 */

useFirestore(provider)

// Features on the roadmap
