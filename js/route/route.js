
angular.module('todolist', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider.when('/doneTasks',
        {
            templateUrl:'js/route/views/doneTasks.html',
            controller:'doneTasksCtrl'
        });
        $routeProvider.otherwise('/',
        {
            redirectTo:'/',
        });
});


angular.module('todolist').controller('doneTasksCtrl', function(todoFactory) {

   this.submit = function () {
        var username = this.username;
        var password = this.password;
   }

});








 