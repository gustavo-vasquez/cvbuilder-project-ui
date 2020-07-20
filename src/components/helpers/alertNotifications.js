export const alertNotifications = {
	success,
	error,
    warning
}

function success(message) {
	alert(message, "alert-success", "border-success");
}

function error(message) {
	alert(message, "alert-danger", "border-error");
}

function warning(message) {
    alert(message, "alert-warning", "border-warning");
}

function alert(message, alertTypeClass, borderColorClass) {
	let alertDiv = document.createElement("div");
    alertDiv.classList = `alert ${alertTypeClass} alert-wrapper ${borderColorClass}`;

    /*if(borderColor)
    	alertDiv.style.borderColor = borderColor;*/

    alertDiv.innerText = message;
    document.querySelector('#root').append(alertDiv);
    setTimeout(function(){ alertDiv.style.animationName = "notificationSlideUp"; }, 7000);
    setTimeout(function(){ alertDiv.remove(); }, 8000);
}