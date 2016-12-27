var http = require('https');
var fs = require('fs');
const csv=require('csvtojson');
var jsonCsvArray = [];



var downloadAndConvert = function(url, dest, callback) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
		console.log("FINISH");

		csv()
		.fromFile(dest)
		.on('data',(data)=>{
			jsonCsvArray.push(JSON.parse(data));
		})
		.on('end',()=>{
			console.log(jsonCsvArray);
			console.log('end'+jsonCsvArray.length);
			fs.unlinkSync(dest);
			callback(null,jsonCsvArray);
		});
    });
  }).on('error', function(err) { // Handle errors
    console.log("Error processing file"+err);
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    callback(err.message);
  });
};


exports.downloadAndConvert = downloadAndConvert;

// /convert/csv/to/json?q=link of csv file
//q=https://s3.amazonaws.com/ed-college-choice-public/Most+Recent+Cohorts+(Scorecard+Elements).csv
//q=https://sakai.unc.edu/access/content/group/3d1eb92e-7848-4f55-90c3-7c72a54e7e43/public/data/bycatch.csv
