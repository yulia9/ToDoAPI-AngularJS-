
angular.module('todolist').controller('TodoCtrl', function(todoFactory) {

    this.isEditing = false;
    this.editingTask = null;


    this.deleteTask = function (task, listIndex) {
        todoFactory.deleteTask(task);
    }

    this.editTask = function (task) {
        this.isEditing = true;
        this.editingTask = angular.copy(task);
    }

    this.updateTask = function (task) {
        todoFactory.updateTask(task, this.editingTask);
        
        this.editingTask = null;
        this.isEditing = false;
    }

    this.moveRight = function (task, list, listIndex, listsLength, nextListId) {
        todoFactory.moveRight(task, list, listIndex, listsLength, nextListId);
    }

     this.moveLeft = function (task, list, listIndex, listsLength, prevListId) {
        todoFactory.moveLeft(task, list, listIndex, listsLength, prevListId);
    }

    this.moveToDoneTasks = function (task) {
        todoFactory.moveToDoneTasks(task)
    }

    this.doneTasks = function () {
        todoFactory.doneTasks();
    }

});






