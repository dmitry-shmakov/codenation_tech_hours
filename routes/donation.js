const express = require("express");
const router = express.Router();

router.get("/donation", function(req, res, next) {
  console.log("getting to /donation route");
  res.render("donation", {
    title: "donation"
  });
});

module.exports = router;
