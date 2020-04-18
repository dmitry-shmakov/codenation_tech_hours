const express = require('express');
const router = express.Router();

// Index and root
router
.get('/', function (req, res, next) {
  res.render('index', 
  { 
    title: 'Home'
  });
})

router
.get('/chat', function (req, res, next) {
  res.render('chat', 
  { 
    title: 'Chat'
  });
})

// router
// .get('/donation', function (req, res, next) {
//   res.render('donation', 
//   { 
//     title: 'donation'
//   });
// })

// router
// .get('/volunteer', function (req, res, next) {
//   res.render('volunteer', 
//   { 
//     title: 'volunteer'
//   });
// })

module.exports = router;
