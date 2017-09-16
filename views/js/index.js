import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom';

import Layout from './pages/Layout';
import FridgeContent from './pages/FridgeContent';

const app = document.getElementById('app');

ReactDOM.render(
	<BrowserRouter>
		<Switch>
		    <Route exact path="/" component={Layout} />
		 	<Route path="/home" component={FridgeContent} />
	 	</Switch>
  	</BrowserRouter>,
app);
