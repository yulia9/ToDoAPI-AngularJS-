
angular.module('todolist').factory('todoFactory',['$http', function ($http) {

    var service = {};
    var tasks = [];
    var arrWithDoneTasks = [];

    if (localStorage.length > 0) {
        $http.delete('/tasks');
        for (var i = 0; i < localStorage.length; i++) {

            if (JSON.parse(localStorage.key(i)) !== 1234512345) {
                tasks.push(JSON.parse (localStorage.getItem(localStorage.key(i))));
                $http.post('/tasks', JSON.parse (localStorage.getItem(localStorage.key(i))));
            }
        }

    } else {
        $http.get('/tasks').success(function (data) {

            for (var i = 0; i < data.length; i++) {
                localStorage.setItem(data[i].id1, JSON.stringify(data[i]));
                tasks.push(data[i]);
            }
        });
    }



    service.getTasks = function (list) {
        return tasks;
    }

    service.addTask = function (list, taskname, description, listId, date, duedate, prior) {

        var priorityId;

        if (prior === "low") {
            priorityId = 1;
        } else if (prior === "medium") {
            priorityId = 2;
        } else if (prior === "high") {
            priorityId = 3;
        }

        var newTask = {
            name: taskname,
            date: date,
            duedate: duedate,
            descrip: description,
            list_id: listId,
            priority: prior,
            id1: Date.now(),
            priorId: priorityId,
            id2: null,
        }

        $http.post('/tasks', newTask);
        localStorage.setItem(newTask.id1, JSON.stringify(newTask));
        tasks.push(newTask);
    }

    service.deleteTask = function (task) {
        tasks.splice(tasks.indexOf(task), 1);
        $http.delete('/tasks/' + task.id1);
        localStorage.removeItem(task.id1);
    };

    service.deleteTasksInDeletedList = function (list) {

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].list_id === list.id) {
                $http.delete('/tasks/' + tasks[i].id1);
                localStorage.removeItem(tasks[i].id1);
            }
        }
    }

    service.updateTask = function (task, updatedTask) {
        task.name = updatedTask.name;
        task.descrip = updatedTask.descrip;
        task.date = updatedTask.date;
        task.duedate = updatedTask.duedate;
        task.priority = updatedTask.priority;

        $http.put('/tasks/' +  task.id1, task);
        localStorage.removeItem(task.id1);
        localStorage.setItem(task.id1, JSON.stringify(task));
    }

    service.moveRight = function (task, list, listIndex, listsLength, nextListId) {
        task.list_id = nextListId;

        $http.put('/tasks/' +  task.id1, task);
        localStorage.removeItem(task.id1);
        localStorage.setItem(task.id1, JSON.stringify(task));
    }

    service.moveLeft = function (task, list, listIndex, listsLength, prevListId) {
        task.list_id = prevListId;

        $http.put('/tasks/' +  task.id1, task);
        localStorage.removeItem(task.id1);
        localStorage.setItem(task.id1, JSON.stringify(task));
    }



    return  service;
}]);






