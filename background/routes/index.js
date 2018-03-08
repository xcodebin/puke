var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'chat'});
});

router.post('/name', function (req, res) {
	res.send({status: 200, name: req.body.name});
});
module.exports = router;
