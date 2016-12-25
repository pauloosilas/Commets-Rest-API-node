let express = require('express');
let router = express.Router();

let postsController = require('../controllers/PostsController');

router.post('/posts', function(req, res){
    postsController.postCreate(req, function(resp){
        res.json(resp);   
    });
});

router.get('/posts', function(req, res){
    postsController.postsFindAll(req, function(resp){
        res.json(resp);
    });
});

router.post('/posts/:postId', function(req, res){
    postsController.commentCreate(req, function(resp){
        res.json(resp);
    });
});

router.get("/posts/:postId", function(req, res){
    postsController.postFind(req, function(resp){
        res.json(resp);
    });
});


module.exports = router;
