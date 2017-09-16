import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, BrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';

const app = document.getElementById('app');

ReactDOM.render(
	<BrowserRouter>
	    <Route path="/" component={Layout}>
	    </Route>
  	</BrowserRouter>,
app);
