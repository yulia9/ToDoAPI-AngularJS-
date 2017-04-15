
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


angular.module('todolist').controller('doneTasksCtrl', function() {

    var ulForBacklog = angular.element(document.getElementById("backlogUl"));

    this.backlogTasks = [];

    this.addTask = function (e) {
        e.preventDefault();
        if (this.todoInTheFuture.length !== 0) {
            // localStorage.setItem('000' + this.todoInTheFuture.substring(0,3), JSON.stringify(this.todoInTheFuture));
            this.backlogTasks.push(this.todoInTheFuture);
            this.todoInTheFuture = "";

        }
   }

});









