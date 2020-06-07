import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// componentes
import { NavigationBar, Main, Footer } from './components/home';
import { SignIn } from './components/authentication';
import { Build } from './components/curriculum/build';
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
					<Route path="/curriculum/build" render={({match, history}) =>
						<Build path={match.path} url={match.url} history={history}></Build>
					}>
					</Route>
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
		<Route {...rest} render={({ location }) =>
	    	rest.loginData ? children : <Redirect to={{ pathname: "/account/signin", state: { from: location }}}/>
		}/>
	);
}