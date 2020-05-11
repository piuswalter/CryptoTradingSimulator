const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
res.send("Express Side works!");
});

module.exports = router;
