// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
var searchTerm  = req.query.q;
var filtered = todos.filter(function(todo){
  return (todo.task.toLowerCase().includes(searchTerm.toLowerCase()) || todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
res.json({filtered});
});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({data:todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
var newToDo = req.body;
if (todos.length > 0){
  newToDo._id = todos[todos.length-1]._id + 1;
} else {
  newToDo._id = 1;
}
todos.push(newToDo);
res.json(newToDo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var toDoId = parseInt(req.params.id);
   var foundToDo = todos.filter(function(toDo){

     return toDo._id ==toDoId;
   })[0];
   res.json(foundToDo);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var toDoId = parseInt(req.params.id);
   var toDoUpdate = todos.filter(function(todo){
     return todo._id === toDoId;
   })[0];
   toDoUpdate.task = req.body.task;
   toDoUpdate.description = req.body.description;
   res.json(toDoUpdate);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var toDoId = parseInt(req.params.id);
   var toDoDelete = todos.filter(function (toDo){
     return toDo._id === toDoId;
   })[0];
   todos.splice(todos.indexOf(toDoDelete), 1);
   res.json(toDoDelete);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
