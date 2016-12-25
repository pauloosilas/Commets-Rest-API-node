let mongoose = require('../../config/db_config');
//let Post = mongoose.model('Post');

let Post = require('../models/Post');


//find a document
module.exports.postFind = function(req, callback){
    let postId = req.params.postId;
    if(!postId){
        callback([{status: 404 ,"Error " : "Post Not Found!"}]);
    }
    else{
        Post.
            findById(postId)
            .exec(function(err, post){
                if(err){
                    callback({error: {"status" : 404, "Error " : err}});
                }
                else{
                    callback([{status: 200},post]);
                }
            });

    }
};

// Find All Posts
module.exports.postsFindAll = function(req, callback){
    Post
        .find({})
        .exec(function(err, allPosts){
            if(err){
                callback([{status: 500, err}])
            }
            else{
                callback([{status: 200}, allPosts]);
            }
        });
};
// Create a document 
module.exports.postCreate = function(req, callback){

    Post.create({

            title: req.body.title,
            body: req.body.body,
            author: req.body.author,
            rating: req.body.rating,
            
    }, function(err, posted){
        if(err){
            callback([{"error" : err}]);
        }
        else{
            callback([{status: 201} ,posted]);
        }
    }) ;   
}

// Add a subdocument
module.exports.commentCreate = function(req, callback){
    var postId = req.params.postId;

    if(postId){
        Post
            .findById(postId)
            .exec(function(err, fatherPost){
                if(err){
                    callback({"Error " : err});
                }
                else{
                    if(!fatherPost){
                        callback([{status: 404, "error " : "Post not found" }]);
                    }
                    else{
                        fatherPost.comments.push({
                            author: req.body.author,
                            body: req.body.body
                       });

                       fatherPost.save(function(err, father){
                      
                            if(err){
                                 callback([{status: 400, "Error " : err}]);
                             }
                             else{
                                 callback([{status: 201} ,father.comments[father.comments.length - 1]]);
                             }
                       });
                    }
                }
            });

    }
    else{
        callback([{status: 404, "Error ": err}]);
    }
}
