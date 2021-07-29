import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { routes } from './configs/routes';
import { createStore } from './configs/redux/store';
import reportWebVitals from './configs/report-web-vitals';
import { ConnectedRouter } from 'connected-react-router';
import { Initializer } from './firebase/Initializer';
import AppRouter from './AppRouter';

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

// todo: get test suites working
// todo: add to exercises "type: weights, time, distance"
// todo: rename all "justify" props on <Grid /> to "justifyContent"
