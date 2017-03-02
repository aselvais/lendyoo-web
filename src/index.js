import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from 'react-router';
import './index.css';

import Home from './sections/Home';
import Contact from './sections/Contact';
import Loan from './sections/Loan';
import User from './sections/User';

/**
 *
 */
class App extends Component {
	render() {
		return (
			<div className="container">
				<div>
					<h1>Lendyoo</h1>
					<ul className="header">
						<li> <IndexLink to="/" activeClassName="active"> Home </IndexLink> </li>
						<li> <Link to="/contact" activeClassName="active"> Contact </Link> </li>
						<li> <Link to="/loan" activeClassName="active"> Loan </Link> </li>
						<li> <Link to="/user" activeClassName="active"> User </Link> </li>
					</ul>
					<div className="row">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="contact" component={Contact} />
			<Route path="loan" component={Loan} />
			<Route path="user" component={User} />
		</Route>
	</Router>,
	document.getElementById('root')
);