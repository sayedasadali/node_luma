var express = require('express');
var router  = express.Router();
var http    = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/computers', function(req, res, next){
	//http://qt.ucsd.edu/cse120/getMap.php?lab_name=EBU3B%20B240	
	options = {
		  host : 'qt.ucsd.edu'
		, port : 80
		, path : '/cse120/getMap.php?lab_name=EBU3B%20B240'
	};
	http.get(options, function(resp){
		console.log('response : ' + resp.statusCode);
		body = "";
		resp.on('data', function(data){
			body += data;
		});
		resp.on('end', function(){
			body = body.replace(/\},\{/g, ',');
			body = body.replace(/\[\{/g, '{');
			body = body.replace(/\}\]/g, '}');
			body = body.replace(/-/g, '_');
			// console.log(body);
			res.json(JSON.parse(body));
		});
	}).on('error', function(e){
		console.log('error : ' + e.message);
	});
});

module.exports = router;
