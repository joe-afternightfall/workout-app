import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { createStore } from './configs/redux/store';
import { Initializer } from './firebase/Initializer';
import { ConnectedRouter } from 'connected-react-router';
import reportWebVitals from './configs/report-web-vitals';

const history = createHashHistory(),
  store = createStore(history);

const initializer = new Initializer(store);
initializer.initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRouter />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// todo: dispatch action if user enters in bad credentials and show error text
// todo: add workout timer to redux store.  on stop/pause/stop
// todo: ******* close side bar on small break point
// todo: create <AppDialog /> component
// todo: ******* create <AppSnackbar /> component
// todo: ******* allow for workout to be edited
// todo: place weekly calendar/daily check on dashboard
// todo: ******* add a daily counter for days in a row working out
// todo: ******* add dots on calendar for days worked out
// todo: add loader cards
// todo: use react-calendar for custom calendar to view when we have worked out
// todo: dots for dojo workouts
// todo: dots for solo/other workouts
// todo: allow for building "workout plan"
// todo: add application snackbar and use when updating/modifying table info
// todo: add full screen button
// todo: allow setup for "SetType"
// todo: create profile page to select icon and fill out info
// todo: use profile page to determine if user has logged in before
// todo: generate user id and start to save workouts under that ID
// todo: use Brute icon for log in page
// todo: cool down dialog in between workouts
// todo: create "circuit builder" page
// todo: create "workout" reducer
// todo: make reducer better/extract out util methods
// todo: allow user to add new category while adding exercise
// todo: create user profile object
// todo: start saving workouts under user profile
// todo: display loader while waiting for user profile to not show dashboard
