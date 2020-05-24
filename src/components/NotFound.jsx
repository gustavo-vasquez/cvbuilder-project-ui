import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

const NotFound = () => {
	return (
		<section className="error-page-bg text-center">
			<Container>
				<Jumbotron>
				  <h1 className="display-3">Error 404</h1>
				  <hr class="my-4 w-50 border-white"/>
				  <h1>La página no existe.</h1>
				  <h1>¯\_(ツ)_/¯</h1>
				</Jumbotron>
			</Container>
		</section>
	);
}

export default NotFound;