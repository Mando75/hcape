import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./components/App/App";
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'redux-zero/react';
import store from './redux-zero/store';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(<Provider store={store}>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </Provider>,
                document.getElementById('root'));
