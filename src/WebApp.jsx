import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// componentes
import { NavigationBar, Main, Footer } from './components/home';
import { SignIn } from './components/authentication';
import { Build } from './components/curriculum/build';
import NotFound from './components/NotFound';
import { authenticationHandler } from './components/helpers';

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
			currentUser: null,
			loginData: null
		}
	}

	componentDidMount() {
		authenticationHandler.currentUser.subscribe(x => this.setState({ currentUser: x }));
	}

	userLogged(data) {
		console.log(data);
		this.setState({ loginData: data });
	}

	render() {
		return (
			<React.Fragment>
				<NavigationBar currentUser={this.state.currentUser}></NavigationBar>
				<Switch>
					<Route path="/account/signin">
						<SignIn></SignIn>
					</Route>
					<PrivateRoute path="/curriculum/build" render={({match, history}) =>
						<Build path={match.path} url={match.url} history={history}></Build>
					}>
					</PrivateRoute>
					<PrivateRoute path="/curriculum/finished">
						<NotFound></NotFound>
					</PrivateRoute>
					<Route exact path="/">
						<Main></Main>
					</Route>
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
	return (
		<Route {...rest} render={({ match, history, location }) =>
			authenticationHandler.currentUserValue ? children || rest.render({match, history}) : <Redirect to={{ pathname: "/account/signin", state: { from: location }}}/>
	    	//rest.loginData ? children || rest.render({match, history}) : <Redirect to={{ pathname: "/account/signin", state: { from: location }}}/>
		}/>
	);
}