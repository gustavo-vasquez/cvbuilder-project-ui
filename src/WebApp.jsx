import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// componentes
import { NavigationBar, Main, Footer } from './components/home';
import { SignIn } from './components/authentication';
import NotFound from './components/NotFound';

// estilos css de librerias
import './assets/lib/bootstrap/bootstrap.min.css';
import './assets/lib/fontawesome-free/css/all.min.css';

// estilos propios
import './assets/css/new-age.css';
import './assets/css/site.css';

class WebApp extends React.Component {
	constructor(props) {
		super(props);
		this.userLogged = this.userLogged.bind(this);
		this.state = {
			loginData: null
		}
	}

	userLogged(data) {
		console.log(data);
		this.setState({ loginData: data });
	}

	render() {
		return (
			<React.Fragment>
				<NavigationBar loginData={this.state.loginData}></NavigationBar>
				<Switch>
					<Route path="/account/signin">
						<SignIn userLogged={this.userLogged}></SignIn>
					</Route>
					<Route exact path="/">
						<Main></Main>
					</Route>
					<PrivateRoute exact path="/curriculum/build">
						<NotFound></NotFound>
					</PrivateRoute>
					<PrivateRoute exact path="/curriculum/finished">
						<NotFound></NotFound>
					</PrivateRoute>
					<Route>
						<NotFound></NotFound>
					</Route>
				</Switch>
				<Footer></Footer>
			</React.Fragment>
		);
	}
}

export default WebApp;

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
	let fakeAuth = false;
	
	return (
		<Route {...rest} render={({ location }) =>
	    	fakeAuth ? children : <Redirect to={{ pathname: "/account/signin", state: { from: location }}}/>
		}/>
	);
}