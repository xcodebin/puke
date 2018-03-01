var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'chat'});
});

router.post('/name', function (req, res) {
	console.log(req.body);
	router.names = req.body.name;
	res.send({state: 'success'});
});

module.exports = router;
