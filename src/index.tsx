// Import external components refrence
import React from 'react'
import ReactDOM from 'react-dom'
import { ReactGA } from 'src/data/firestoreClient'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'reflect-metadata'
import registerServiceWorker from './registerServiceWorker'
import config from 'src/config'

import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import { ConnectedRouter } from 'connected-react-router/immutable'

// - Actions

import * as globalActions from 'store/actions/globalActions'

// - Import app components
import Master from 'views/master'

// App css
import './styles/app.css'

// Initialize google analytics
const trackingId = "UA-144370201-1"
ReactGA.initialize(trackingId)

const disableReactDevTools = (): void => {
	const noop = (): void => undefined
	const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
  
	if (typeof DEV_TOOLS === 'object') {
		for (const [key, value] of Object.entries(DEV_TOOLS)) {
			DEV_TOOLS[key] = typeof value === 'function' ? noop : null
		}
	}
  }
if (process.env.NODE_ENV === 'production') {
    disableReactDevTools()
}

// import './assets/scss/material-kit-react.scss?v=1.4.0'
// import './assets/scss/material-kit-react.css'

/**
 * Execute startup functions
 */
import './socialEngine'
import rootSaga from 'store/sagas/rootSaga'

configureStore.runSaga(rootSaga)

// Set default data
// tslint:disable-next-line:no-empty
configureStore.store.subscribe(() => { })

// - Initialize languages
configureStore.store.dispatch(globalActions.initLocale())

// Needed for onClick
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) { }

const theme = createMuiTheme({
	breakpoints: {
		values: {
		  xs: 200,
		  sm: 600,
		  md: 960,
		  lg: 900,
		  xl: 1200
		}
	  },
	palette: {
		primary: { main: config.theme.primaryColor },
		secondary: { main: config.theme.secondaryColor },
	},
	typography: {
		useNextVariants: true,
	},
})

const supportsHistory = 'pushState' in window.history

const history = configureStore.history

history.listen(location => {
	 ReactGA.set({page: location.pathname})
	 ReactGA.pageview(location.pathname)
})

ReactDOM.render(
	<Provider store={configureStore.store}>
		<ConnectedRouter  history={configureStore.history}>
			<MuiThemeProvider theme={theme}>
				<Master />
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('content') as HTMLElement
)
registerServiceWorker()
