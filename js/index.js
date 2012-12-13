bind: function() {
    document.addEventListener('deviceready', this.deviceready, false);
},
deviceready: function() {
    // note that this is an event handler so the scope is that of the event
    // so we need to call app.report(), and not this.report()
    initPushwoosh();
 
    app.report('deviceready');
},

    function initPushwoosh() {
    var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();
 
    pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"PUSHWOOSH_APP_ID", appname:"APP_NAME"},
        function(status) {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function(status) {
            console.warn('failed to register : ' + JSON.stringify(status));
            navigator.notification.alert(JSON.stringify(['failed to register ', status]));
        }
    );
 
    pushNotification.setApplicationIconBadgeNumber(0);
 
    document.addEventListener('push-notification', function(event) {
        var notification = event.notification;
        navigator.notification.alert(notification.aps.alert);
        pushNotification.setApplicationIconBadgeNumber(0);
    });
}