var express = require('express')
var app = express();
var csvtojsonController = require('./controllers/csvtojsonController.js');

app.get('/convert/csv/to/json', function (req, res) {
  var url = req.query.q;
  csvtojsonController.downloadAndConvert(url,'./out.csv',function(error,jsonArray){
		if(error){res.send(error);}	  
		res.send(jsonArray);
	});
});

app.get('/_ping', function (req, res) {
  	  
	res.send("Ping Success");
});

app.listen(5000, function () {
  console.log('csvtojson app listening on port 3000!')
});

