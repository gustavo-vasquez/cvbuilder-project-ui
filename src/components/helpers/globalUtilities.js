export function loadCssFile(id, href) {
	let linkElement = document.getElementById(id);

	if(!linkElement) {
		var head  = document.getElementsByTagName('head')[0];
	    var link  = document.createElement('link');
	    link.id = id;
	    link.rel  = 'stylesheet';
	    link.type = 'text/css';
	    link.href = href;
	    link.media = 'all';
	    head.appendChild(link);
	}
	else
		linkElement.href = href;
}