import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import promiseMiddleware from 'redux-promise'; 
import ReduxThunk from 'redux-thunk';//객체대신 함수를 생성하는 액션 생성가능
import rootReducer from './_reducers'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';


//그냥 스토어에 객체를 받을 수 없으므르 promise와  function 도 받을 수 있는 미들웨어를 포함한
//store를 생성
const composeEnhanecer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    rootReducer,
    composeEnhanecer( 
    applyMiddleware(ReduxThunk),
    applyMiddleware(promiseMiddleware))
)
   

const persistor = persistStore(store)

ReactDOM.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App/>
        </PersistGate>
      </Provider>
  ,
  document.getElementById('root')
);

