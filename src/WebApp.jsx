import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// componentes
import { NavigationBar, Main, Footer } from './components/home';
import { SignIn } from './components/authentication';
import { Build } from './components/curriculum/build';
import Finished from './components/curriculum/ready/Finished';
import NotFound from './components/NotFound';
import { authenticationHandler, authorizationHeader, handleResponse, alertNotifications, abortSignal } from './components/helpers';
import { SplashScreen } from './SplashScreen';

class WebApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
			showSplashScreen: true
		}
	}

	async componentDidMount() {
		await authenticationHandler.currentUser.subscribe(x => this.setState({ currentUser: x }));
		this.checkUserData();
	}

	checkUserData = () => {
        if(this.state.currentUser && this.state.showSplashScreen) {
            const requestOptions = {
                method: "GET",
                headers: authorizationHeader(),
                signal: abortSignal.controller.signal
            };

            fetch("https://localhost:5001/api/account/checkToken", requestOptions)
            .then(handleResponse)
            .then(async result => {
                if(result) {
                    if(result.retry) {
                        await abortSignal.updateAbortSignal();
                        this.checkUserData();
                    }
                }
                else
                	this.setState({ showSplashScreen: false });
            })
            .catch(errorMessage => alertNotifications.error(errorMessage));
        }
        else
    		this.setState({ showSplashScreen: false });
	}

	render() {
		if(this.state.showSplashScreen)
			return <SplashScreen/>
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

// Te redirige a la pantalla de login si no estás autenticado.
function PrivateRoute({ children, ...rest }) {
	return (
		<Route {...rest} render={({ match, history, location }) =>
			authenticationHandler.currentUserValue ? children || rest.render({match, history}) : <Redirect to={{ pathname: "/account/signin", state: { from: location }}}/>
		}/>
	);
}