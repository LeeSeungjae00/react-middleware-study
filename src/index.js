import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, {rootSaga} from './modules';
// import myLogger from './middlewares/myLogger';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    ReduxThunk.withExtraArgument({history : customHistory}),
    sagaMiddleware,logger))
); // 여러개의 미들웨어를 적용 할 수 있습니다.


sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Router history = {customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();