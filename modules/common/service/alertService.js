(function () {
	'use strict';
	 angular
        .module('image-editor')
        .factory('alert', alert);

        alert.$inject = ['$rootScope', '$http','$window'];
    	function alert($rootScope, $http) {
	       	var tempAlert = {};
    	   	tempAlert.openClose = openClose;
          tempAlert.popUpShowHide = popUpShowHide;
       		return tempAlert;

       		function openClose(modalId, messageId, message){
       			if($("#" + modalId).hasClass("in") == false){
       				$("#" + modalId).modal('show');
					angular.element('body').removeClass("modal-open");
					angular.element("#" + messageId).text(message);
					setTimeout(function () {
						if($("#" + modalId).hasClass("in") == true){
							$("#" + modalId).modal('toggle');
						}
					}, 8000);
       			}
       		}
          function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

              return text;
          }


          function popUpShowHide(messageId, message){
            var target = document.getElementById('p-f');
            //var string = message.replace('.', '');
            var divId = makeid();
            angular.element(target).append("<div class='alert-box "+messageId+"' id="+divId+"><strong>"+message+"</strong></div>");
                $( "#"+divId ).fadeIn( 300 ).delay( 1500 );
                setTimeout(function () {
                  $( "#"+divId ).remove();
                }, 5000);
            }
        }
})();