import React, { Fragment, Component } from 'react'
import { withStyles, Theme, Card, CardContent, Typography, Switch, FormControlLabel } from '@material-ui/core'
import { messaging } from 'data/firestoreClient'

import {IfcmNotificationProps} from './fcmNotificationProps'
import {IfcmNotificationState} from './fcmNotificationState'

// Import Actions
import * as notificationActions from 'src/store/actions/notifyActions'

const styles = (theme: Theme) => ({
  
})

class Notifications extends Component<IfcmNotificationProps, IfcmNotificationState> {
    constructor(props: IfcmNotificationProps) {
        super(props)
         this.state = {
             info: ''
         }

         this.renderSubscriptionOptions = this.renderSubscriptionOptions.bind(this)
    }

    async notificationPermission() {
        let permisstionGranted = false
        const {userId} = this.props
        try {
            if (Notification.permission !== 'granted') {
                await messaging.requestPermission()
            }
            if (localStorage.getItem('INSTANCE_TOKEN') !== null) {
                permisstionGranted = true
            } else {
                const token = await messaging.getToken() 
            
                notificationActions.sendTokenTodb(userId, token)
                localStorage.setItem('INSTANCE_TOKEN', token)

            }
        } catch (error) {
             console.log(error)
        }
    }

    componentWillMount () {
        this.notificationPermission()
    }

    renderSubscriptionOptions ( ) {
        if (!('serviceWorker' in navigator) && !('PushManager' in window)) {
            return(<div> {'Notification feature is supported only in chrom Desktop and  Mobile (version 50+) Firefox Desktop and Mobile Opera on Mobile'}</div>
            )
       } 
    }

    render() {
        return (
           <div>
              {this.renderSubscriptionOptions()}
         </div>
        )
    }
}

export default withStyles(styles as any)(Notifications)