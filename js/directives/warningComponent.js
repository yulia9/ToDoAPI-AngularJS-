angular.module('todolist').

  directive('warningMessage', function () {
  	return {
  		link: function (scope, element, attrs) {

        scope.notify = function () {
        	if (element.css("display") === "none") {
	            element.css("display", "block") 
	        } else {
	            element.css("display", "none");
	        } 
        }

        },

  		restrict: 'A',
    	template:
	        '<div id="notify">' +
	            '<b> {{warningMessage}}  </b>' +
	            '<i class="fa fa-times"> </i>' +
	        '</div>',
 		scope:{
             warningMessage:'@'
            },
       
    	}
  	}
);


     