import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, IndexLink, Link, hashHistory} from 'react-router';
import {Navbar} from 'react-bootstrap';
import './index.css';

import Home from './sections/Home';
import Contact from './sections/Contact';
import Loan from './sections/Loan';
import User from './sections/User';

/**
 *
 */
class Index extends Component {
	render()
	{
		return (
			<div className="container">


				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">Lendyoo Admin</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Navbar.Collapse>
						<ul className="nav navbar-nav" role="presentation">
							<li role="presentation"><IndexLink to="/" activeClassName="active" role="button"> Home </IndexLink></li>
							<li role="presentation"><Link to="/contact" activeClassName="active" role="button"> Contact </Link></li>
							<li role="presentation"><Link to="/loan" activeClassName="active" role="button"> Loan </Link></li>
							<li role="presentation"><Link to="/user" activeClassName="active" role="button"> User </Link></li>
						</ul>
					</Navbar.Collapse>
				</Navbar>


				<div>
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
		<Route path="/" component={Index}>
			<IndexRoute component={Home}/>
			<Route path="contact" component={Contact}/>
			<Route path="loan" component={Loan}/>
			<Route path="user" component={User}/>
		</Route>
	</Router>,
	document.getElementById('root')
);