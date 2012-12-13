function initPushwoosh() {
	var pushNotification = window.plugins.pushNotification;
	pushNotification.deviceReady();
	
	pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"572D8-611BE", appname:"test"},
									function(status) {
									var deviceToken = status['deviceToken'];
									console.warn('registerDevice: ' + deviceToken);
									},
									function(status) {
									console.warn('failed to register : ' + JSON.stringify(status));
									navigator.notification.alert(JSON.stringify(['failed to register ', status]));
									});
	
	pushNotification.setApplicationIconBadgeNumber(0);
	
	document.addEventListener('push-notification', function(event) {
							  var notification = event.notification;
							  navigator.notification.alert(notification.aps.alert);
							  pushNotification.setApplicationIconBadgeNumber(0);
							  });
}



  function init() {
document.addEventListener("deviceready", deviceReady, true);
delete init;
}



function deviceReady() {
    
      initPushwoosh();

}