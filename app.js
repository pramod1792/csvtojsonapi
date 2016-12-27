var express = require('express')
var app = express();
var csvtojsonController = require('./controllers/csvtojsonController.js');
const tempCsvFilePath='./tempDest.csv';

var port = process.env.PORT || process.env.npm_package_config_port;

app.get('/convert/csv/to/json', function (req, res) {
  var url = req.query.q;
  csvtojsonController.downloadAndConvert(url,tempCsvFilePath,function(error,jsonArray){
		if(error){
			console.log("Error occuered : "+err);
			res.send(error);
		}	  
		res.send(jsonArray);
	});
});

app.get('/_ping', function (req, res) {
  	  
	res.send("Ping Success");
});

app.listen(port, function () {
  console.log('csvtojson app listening on port '+port)
});

