export const alertNotifications = {
	success,
	error
}

function success(message) {
	alert(message, "alert-success");
}

function error(message) {
	alert(message, "alert-danger", "#d68a91");
}

function alert(message, alertTypeClass, borderColor) {
	let alertDiv = document.createElement("div");
    alertDiv.classList = `alert ${alertTypeClass} alert-wrapper`;

    if(borderColor)
    	alertDiv.style.borderColor = borderColor;

    alertDiv.innerText = message;
    document.querySelector('#root').append(alertDiv);
    setTimeout(function(){ alertDiv.style.animationName = "notificationSlideUp"; }, 7000);
    setTimeout(function(){ alertDiv.remove(); }, 8000);
}