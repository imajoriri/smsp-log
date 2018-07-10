var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  res.send("ok");
});

module.exports = router;
