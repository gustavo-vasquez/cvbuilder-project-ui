import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer>
	        <Container>
	            <p className="social-media">
	            	<a href="https://www.facebook.com" title="Síguenos en Facebook" alt="facebook_link"><i className="fab fa-facebook-square"></i></a> 
	            	<a href="https://www.twitter.com" title="Síguenos en Twitter" alt="twitter_link"><i className="fab fa-twitter"></i></a> 
	            	<a href="https://www.youtube.com" title="Suscríbete en Youtube" alt="youtube_link"><i className="fab fa-youtube"></i></a>
	            </p>
	            <p>&copy; CVBuilder {new Date().getFullYear()} All Rights Reserved.</p>
	            <ul className="list-inline">
	                <li className="list-inline-item">
	                    <a href="/">Privacy</a>
	                </li>
	                <li className="list-inline-item">
	                    <a href="/">Terms</a>
	                </li>
	                <li className="list-inline-item">
	                    <a href="/">FAQ</a>
	                </li>
	            </ul>
	        </Container>
	    </footer>
	);
}

export default Footer;