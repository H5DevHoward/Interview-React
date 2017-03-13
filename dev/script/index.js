import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './components/Loading';

ReactDOM.render(
    <div className="app">
        <Loading />
    </div>,
    document.getElementById('root')
);
