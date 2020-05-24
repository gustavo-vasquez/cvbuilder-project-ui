import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavigationBar, Main, Footer } from './components/home';
import SignIn from './components/authentication/SignIn';
import NotFound from './components/NotFound';

// estilos css de librerias
import './assets/lib/bootstrap/bootstrap.min.css';
import './assets/lib/fontawesome-free/css/all.min.css';

// estilos propios
import './assets/css/new-age.css';
import './assets/css/site.css';

class WebApp extends React.Component {
	render() {
		return (
			<React.Fragment>
				<NavigationBar></NavigationBar>
				<Switch>
					<Route path="/account/login">
						<SignIn></SignIn>
					</Route>
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