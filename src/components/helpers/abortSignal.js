export const abortSignal = {
	controller: new AbortController(),
	updateAbortSignal
}

function updateAbortSignal() {
	// setup AbortController
	abortSignal.controller.abort();
	abortSignal.controller = new AbortController();
	// signal to pass to fetch
	//const signal = abortController.signal;
}