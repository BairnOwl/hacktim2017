import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import Layout from './pages/Layout';

const app = document.getElementById('app');

ReactDOM.render(
	<Router>
	    <Route path="/" component={Layout}>
	    </Route>
  	</Router>,
app);
