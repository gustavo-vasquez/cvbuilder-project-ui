import React from 'react';
import { NavigationBar, Main, Footer } from './components/home';
//import SignIn from './components/authentication/SignIn';

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
				<Main></Main>
				<Footer></Footer>
			</React.Fragment>
		);
	}
}

export default WebApp;