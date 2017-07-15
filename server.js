var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var customers = [
  {id: 1, name: "John", address: "San Franscisco", phone: "11111"},
  {id: 2, name: "James", address: "Oakland", phone: "22222"},
  {id: 3, name: "Kevin", address: "Richmond", phone: "33333"},
  {id: 4, name: "Sepp", address: "Albany", phone: "44444"}
];

app.get("/api/customers", function(req, res){
  res.json(customers);
});
app.get("/api/customers/:id", function(req, res){
  var requiredId = parseInt(req.params.id);
  var requiredData = customers.filter(function(data){
    return requiredId === data.id;
  })[0];
  res.json(requiredData);
});
app.post("/api/customers", function(req,res){
  var newData = req.body;
  if (customers.length > 0){
    newData.id = customers[customers.length -1].id + 1;
  } else {
    newData.id = 1;
  }
  customers.push(newData);
  res.json(newData);
});
app.put("/api/customers/:id", function(req, res){
  var requiredId = parseInt(req.params.id);
  var updateData = req.body;
  var requiredData = customers.filter(function(data){
    return requiredId === data.id;
  })[0];
  requiredData.name = updateData.name;
  requiredData.address = updateData.address;
  requiredData.phone = updateData.phone;

  res.json(requiredData);
});

app.delete("/api/customers/:id", function(req, res){
  var requiredId = parseInt(req.params.id);
  var requiredData = customers.filter(function(data){
    return requiredId === data.id;
  })[0];
  customers.splice(customers.indexOf(requiredData),1);
res.json(requiredData);
});
app.listen(3000, function(){
  console.log("HTTP server is listening at local port 3000");
})
