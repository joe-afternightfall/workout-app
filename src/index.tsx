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
// todo: create <AppDialog /> components
// todo: app dialog components:  <AppDialogTitle /> <AppDialogActions />
// todo: ******* create <AppSnackbar /> component
// todo: ******* allow for workout to be edited
// todo: ******* add a daily counter for days in a row working out
// todo: add loader cards
// todo: dots for solo/other workouts
// todo: allow for building "workout plan"
// todo: add application snackbar and use when updating/modifying table info
// todo: allow setup for "SetType"
// todo: create profile page to select icon and fill out info
// todo: cool down dialog in between workouts
// todo: make reducer better/extract out util methods
// todo: allow user to add new category while adding exercise
// todo: display loader while waiting for user profile to not show dashboard
// todo: don't allow work out date after today to be selected
// todo: allow user to make their own "daily checklist"
// todo: add application to log rocket
// todo: create "on-hover" tooltips for side drawer when showing icons
// todo: allow for decimal's as weights
// todo: add "timer" option to set types
// todo: make a dynamic timer that can take in params
// todo: show "last workout" weight and date when on workout screen
