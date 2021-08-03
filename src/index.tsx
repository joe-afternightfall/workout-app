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

// todo: redirect user to login when firebase user object is null
// todo: redirect user to dashboard after login
// todo: get test suites working
// todo: add to exercises "type: weights, time, distance"
// todo: rename all "justify" props on <Grid /> to "justifyContent"
// todo: create github repo for app
// todo: create firebase job and hosting service
// todo: only allow one "Circuit" to be opened at a time. rip out action to redux
// todo: add workout timer to redux store.  on stop/pause/stop
// todo: close side bar on small break point
