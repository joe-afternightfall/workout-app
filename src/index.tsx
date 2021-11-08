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
// todo: app dialog components:  <AppDialogTitle /> <AppDialogActions />
// todo: ******* create <AppSnackbar /> component
// todo: ******* allow for workout to be edited
// todo: ******* add a daily counter for days in a row working out
// todo: add loader cards
// todo: dots for solo/other workouts
// todo: allow for building "workout plan"
// todo: add application snackbar and use when updating/modifying table info
// todo: create profile page to select icon and fill out info
// todo: cool down dialog in between workouts
// todo: allow user to make their own "daily checklist"
// todo: add application to log rocket
// todo: show "last workout" weight and date when on workout screen
