// Redirects immediately if warnings not shown yet and user is not Neocities screenshotter
var userWarned = localStorage.getItem("warned")

if (navigator.userAgent.toLowerCase() == 'screenjesus') { var screenJesus = true}
else { var screenJesus = false }

if ( 
  userWarned != "true" && 
  screenJesus == false && 
  window.location.pathname != "/meta/warning"
) {
	window.location.href = "/meta/warning?"+window.location.pathname;
}

// Make color schemes..?

// Cookie Test - bruh i hate cookies tf
document.cookie = "expires=Thu, 08 Apr 2030 00:00:00 UTC;";

function getCookieValue(name) {
  cookieString = document.cookie;
  cookiesArray = cookieString.split(';');
  for ( i = 0; i < cookiesArray.length ;i++ ){
	if(cookiesArray[i].includes(name)){
		equalsIndex = cookiesArray[i].indexOf("=") + 1;
		return cookiesArray[i].slice(equalsIndex);
	}
  }
  return "";
}