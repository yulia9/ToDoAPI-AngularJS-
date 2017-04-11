angular.module('todolist').factory('listFactory',['$http', function($http) {

	var service = {};
	var lists = [];

	var listsObj = {
		id3: 1234512345,
		lists: lists,
	};


    if (localStorage.length > 0) {
        $http.delete('/lists');
        for (var i = 0; i < localStorage.length; i++) {

        	if (JSON.parse(localStorage.key(i)) === listsObj.id3) {
   
        		lists = JSON.parse (localStorage.getItem(localStorage.key(i)));
        		listsObj.lists = lists;
        		$http.post('/lists', listsObj);	
        	}  
        } 
    } else {
        $http.get('/lists').success(function (data) {
        	
        	if (data.length !== 0) {
        		lists = data[0].lists;
            	localStorage.setItem(listsObj.id3, JSON.stringify(lists));
        	} else {
        		$http.post('/lists', listsObj);	
        	}
        	
        });
    }


	service.getLists = function() {
		return lists
	}

	service.addNewList = function(list, listName) {

		var newList = {
			id: Date.now(),
			listName: listName,
		}
		lists.push(newList);
		listsObj.lists = lists;
		$http.put('/lists/' +  listsObj.id3, listsObj);
		localStorage.setItem( listsObj.id3, JSON.stringify(lists));
	}

	service.deleteList = function (list) {
		lists.splice(lists.indexOf(list), 1);
		localStorage.removeItem(listsObj.id3);	
		localStorage.setItem( listsObj.id3, JSON.stringify(lists));
		listsObj.lists = lists;
		$http.put('/lists/' +  listsObj.id3, listsObj);
	}


	return service;

}])