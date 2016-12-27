var express = require('express');
var app = express();
var csvtojsonController = require('./controllers/csvtojsonController.js');
const tempCsvFilePath='./tempDest.csv';
var conf = require('./package');

var port = process.env.PORT || conf.config.port;

app.get('/convert/csv/to/json', function (req, res) {
  if(req.query.q){
    var url = req.query.q;
    csvtojsonController.downloadAndConvert(url,tempCsvFilePath,function(error,jsonArray){
		    if(error){
			       console.log("Error occuered : "+err);
			          res.status(500).send(error);
		    }
		    res.status(200).send(jsonArray);
	 });
 }else{
   res.status(400).send({"Error":"Please provide csv file url in 'q' parameter."});
 }
});

app.get('/_ping', function (req, res) {

	res.send("Ping Success");
});

app.listen(port, function () {
  console.log('csvtojson app listening on port '+port)
});
