/**
 * Created by vladthelittleone on 29.02.16.
 */
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next)
{
	req.session.destroy();
	res.send({});
});

module.exports = router;