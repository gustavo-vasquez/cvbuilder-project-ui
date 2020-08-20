import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// componentes
import { NavigationBar, Main, Footer } from './components/home';
import { SignIn } from './components/authentication';
import { Build } from './components/curriculum/build';
import Finished from './components/curriculum/ready/Finished';
import NotFound from './components/NotFound';
import { authenticationHandler } from './components/helpers';
import { SplashScreen } from './SplashScreen';

class WebApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null
		}
	}

	componentDidMount() {
		authenticationHandler.currentUser.subscribe(x => this.setState({ currentUser: x }));
	}

	render() {
		if(this.state.currentUser === undefined)
			return <SplashScreen></SplashScreen>
		else
			return (
				<React.Fragment>
					<NavigationBar currentUser={this.state.currentUser}></NavigationBar>
					<Switch>
						<Route path="/account/signin">
							<SignIn></SignIn>
						</Route>
						{/*<Route path="/curriculum/build" render={({match, history}) =>
							<Build path={match.path} url={match.url} history={history}></Build>
						}/>*/}
						<PrivateRoute path="/curriculum/build" render={({match, history}) =>
							<Build path={match.path} url={match.url} history={history}></Build>
						}>
						</PrivateRoute>
						<PrivateRoute path="/curriculum/finished">
							<Finished></Finished>
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
		}/>
	);
}