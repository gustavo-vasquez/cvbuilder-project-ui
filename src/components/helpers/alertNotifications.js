export const alertNotifications = {
	success,
	error,
    info
}

function success(message) {
	alert(message, "alert-success", "border-success");
}

function error(message) {
	alert(message, "alert-danger", "border-danger");
}

function info(message) {
    alert(message, "alert-info", "border-info");
}

function alert(message, alertTypeClass, borderColorClass) {
	let alertDiv = document.createElement("div");
    alertDiv.classList = `alert ${alertTypeClass} alert-wrapper ${borderColorClass}`;
    alertDiv.innerText = message;
    document.querySelector('#root').append(alertDiv);
    setTimeout(function(){ alertDiv.style.animationName = "notificationSlideUp"; }, 7000);
    setTimeout(function(){ alertDiv.remove(); }, 8000);
}