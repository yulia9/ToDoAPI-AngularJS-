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

app.get('/tasks/:id', function (request, response) {
    db.collection('tasks').findOne({id: Number(request.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.send(doc);
    })
});

//добавление объекта в массив
app.post('/tasks', function (request, response) {
    var task = {
        name: request.body.name,
        descrip: request.body.descrip,
        date: request.body.date,
        duedate: request.body.duedate,
        status: request.body.status,
        id: request.body.id,
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

//обновление информации после добавления
app.put('/tasks/:id', function(request, response) {
    db.collection('tasks').updateOne( {id: Number(request.params.id)},
    {
        name: request.body.name,
        descrip: request.body.descrip,
        date: request.body.date,
        duedate: request.body.duedate,
        status: request.body.status,
        id: request.body.id,
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
3
app.delete('/tasks/:id',  function(request, response) {
    db.collection('tasks').deleteOne( {id: Number(request.params.id)},
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
    db.collection('tasks').deleteMany( {id2: '09099090'},
    function (err, result) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);
        }
        response.sendStatus(200)
        }       
    )
});


MongoClient.connect('mongodb://todoUser:todoUserPassword@ds127190.mlab.com:27190/todolist', function (err, database) {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(8080, function () {
        console.log('API started');
    })
})