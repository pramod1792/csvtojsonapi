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

app.listen(3000, function () {
  console.log('csvtojson app listening on port 3000!')
});

