angular.module('todolist').controller('ListCtrl', function(listFactory, todoFactory) {

    this.taskAdd = false;
    this.listNamePresence = true;
    this.mandatoryFields = true;

    this.showTaskForm = function () {
        this.taskAdd = true;
    }

    this.notify = function () {
        var noteBlock = angular.element(document.getElementById("notify"));
        
        if (noteBlock.css("display") === "none") {
            noteBlock.css("display", "block") 
        } else {
            noteBlock.css("display", "none");
        } 
    }

    this.getLists = function () {
        return listFactory.getLists();
    }

     this.getTasks = function (list) {
        return todoFactory.getTasks(list);
    }

    this.addNewList = function (list) {

        if (!this.listName) {
            this.listNamePresence = false;
        } else if (this.getLists().length === 5) {
            this.notify();
        } else {
            listFactory.addNewList(list, this.listName);
            this.listName = "";
            this.listNamePresence = true;
        } 
    }

    this.deleteList = function (list) {
        listFactory.deleteList(list);
        todoFactory.deleteTasksInDeletedList(list);
    }
    
    this.addTask = function (list) {

        if (!this.id) {
            this.id = this.getLists()[0].id;
        }

        if (!this.taskName || !this.priority) {
            this.mandatoryFields = false;
        } else {          
            todoFactory.addTask(list, this.taskName, this.description, this.id, this.date, this.duedate, this.priority);
            this.taskName = "";
            this.description = "";
            this.date = "";
            this.duedate = "";
            this.priority = "";

            this.taskAdd = false;

            this.mandatoryFields = true;
        }


    }

});
