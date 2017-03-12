'use strict';

/* Controllers */
var todolist = angular.module('todolist', []);

todolist.controller('TodolistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    var localStorageArr = [];

    if (localStorage.length > 0) {
        $http.delete('/tasks');
        for (var i = 0; i < localStorage.length; i++) {
            localStorageArr.push(JSON.parse (localStorage.getItem(localStorage.key(i))));
            $http.post('/tasks', JSON.parse (localStorage.getItem(localStorage.key(i))));
        } 
    } else {
        $http.get('/tasks').success(function (data) {
            $scope.blockInfo = data;

            for (var i = 0; i < arguments[0].length; i++) {
                localStorage.setItem(arguments[0][i].id, JSON.stringify(arguments[0][i]));
                localStorageArr.push(arguments[0][i]);
            }
        });
    }
    $scope.blockInfo = localStorageArr;  

    $scope.moveLeft = function (task) {
        if (task.status === 'statusinprogress') {
            task.status = "statustodo";
        } else if (task.status === 'statustest') {
            task.status = "statusinprogress";
        } else if (task.status === 'statusdone') {
            task.status = "statustest";  
        }
        $http.put('/tasks/' +  task.id, task).success(function () { 
        });
        localStorage.removeItem(task.id);
        localStorage.setItem(task.id, JSON.stringify(task));
    };

    $scope.moveRight = function (task) {
        if (task.status === 'statustodo') {
            task.status = "statusinprogress";
        } else if (task.status === 'statusinprogress') {
            task.status = "statustest";
        } else if (task.status === 'statustest') {
            task.status = "statusdone";
        } 
        $http.put('/tasks/' +  task.id, task).success(function () {
        })
        localStorage.removeItem(task.id);
        localStorage.setItem(task.id, JSON.stringify(task));  
    };

    $scope.addTask = function() {
        var inputTaskName = document.getElementById("taskName");
        var note = document.getElementById("notification");
        var taskDate = document.getElementById("taskDate");
        var dueDate = document.getElementById("dueDate");
        var description = document.getElementById("description");
        var priorityChoose = document.getElementById("prior");
        var highPriority = document.getElementById("highPriority");

        if (inputTaskName.value.length === 0 || priorityChoose.value.length === 0) {
            note.style.visibility = 'visible';
        } else if (inputTaskName.value.length !== 0 && priorityChoose.value.length !== 0) {
            var priorityId;

            if (priorityChoose.value === " high ") {
                priorityId = 1;
                $scope.priorClass = "priorClassHigh";
            } else if (priorityChoose.value === " medium ") {
                priorityId = 2;
                $scope.priorClass = "priorClassMedium";
            } else if (priorityChoose.value === " low ") {
                priorityId = 3;
            }
            
            var newToDoTask = {
                name: $scope.taskName,
                date: $scope.taskDate,
                duedate: $scope.dueDate,
                descrip: $scope.description,
                status: "statustodo",
                priority: priorityChoose.value,
                id: Date.now(),
                priorId: priorityId,
                id2: '09099090',
            }

            $http.post('/tasks', newToDoTask).success(function (task) {
            });
            localStorage.setItem(newToDoTask.id, JSON.stringify(newToDoTask));
            $scope.blockInfo.push(newToDoTask);

            note.style.visibility = 'hidden';
            inputTaskName.value = "";
            $scope.taskDate = "";
            $scope.dueDate = "";
            $scope.description = "";
            priorityChoose.value = "";
        }
    };


    $scope.deleteTask = function (task) {
        $scope.blockInfo.splice($scope.blockInfo.indexOf(task), 1);
        localStorage.removeItem(task.id);
        $http.delete('/tasks/' + task.id, {tasks: {id: task.id}}).success(function (task) {
        })
    };

    



}]);






