import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./components/App/App";
import {BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';


ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
