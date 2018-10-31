import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SimpleWord from './SimpleWord';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SimpleWord  />, document.getElementById('root'));
registerServiceWorker();
