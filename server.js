var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var path = require('path');

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send ('Hello api');
});

app.get('/tasks', function (request, response) {
    db.collection('tasks').find().toArray(function(err, docs) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.send(docs)
    })
});

app.get('/lists', function (request, response) {
    db.collection('lists').find().toArray(function(err, docs) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.send(docs)
    })
});



app.get('/tasks/:id', function (request, response) {
    db.collection('tasks').findOne({id1: Number(request.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.send(doc);
    })
});



app.post('/tasks', function (request, response) {
    var task = {
        name: request.body.name,
        descrip: request.body.descrip,
        date: request.body.date,
        duedate: request.body.duedate,
        list_id: request.body.list_id,
        id1: request.body.id1,
        priority: request.body.priority,
        priorId: request.body.priorId,
        id2: request.body.id2,

    };
    db.collection('tasks').insert(task, function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.send(task);
    });
} );

app.post('/lists', function (request, response) {
    var list = {
        id3: request.body.id3,
        lists: request.body.lists,
    };
    db.collection('lists').insert(list, function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.send(list);
    });
} );



app.put('/lists/:id3', function(request, response) {
    db.collection('lists').updateOne( {id3: 1234512345},
    {
        id3: request.body.id3,
        lists: request.body.lists,
    },
    function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.sendStatus(200)
    }
    )
})


app.put('/tasks/:id1', function(request, response) {
    db.collection('tasks').updateOne( {id1:request.body.id1},
    {
        name: request.body.name,
        descrip: request.body.descrip,
        date: request.body.date,
        duedate: request.body.duedate,
        list_id: request.body.list_id,
        id1: request.body.id1,
        priority: request.body.priority,
        priorId: request.body.priorId,
        id2: request.body.id2,
    },
    function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.sendStatus(200)
    }
    )
})

app.delete('/tasks/:id1',  function(request, response) {
    db.collection('tasks').deleteOne( {id1: Number(request.params.id1)},
    function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.sendStatus(200)
    }
    )
})




app.delete('/tasks', function(request, response) {
    db.collection('tasks').deleteMany( {id2: null},
    function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.sendStatus(200)
        }
    )
});



app.delete('/lists', function(request, response) {
    db.collection('lists').deleteMany( {id3: 1234512345},
    function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.sendStatus(200)
        }
    )
});

// app.delete('/lists/:id',  function(request, response) {
//     db.collection('lists').deleteOne( {id:request.params.id},
//     function (err, result) {
//         if (err) {
//             console.log(err);
//             return response.sendStatus(500);
//         }
//         response.sendStatus(200)
//     }
//     )
// })

// app.get('/lists/:idList', function (request, response) {
//     db.collection('lists').findOne({id: request.params.id}, function(err, doc) {
//         if (err) {
//             console.log(err);
//             return response.sendStatus(500);
//         }
//         response.send(doc);
//     })
// });


MongoClient.connect('mongodb://todoUser:todoUserPassword@ds127190.mlab.com:27190/todolist', function (err, database) {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(8000, function () {
        console.log('API started');
    })
})
