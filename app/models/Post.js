let mongoose = require('../../config/db_config');


let commentsSchema = new mongoose.Schema({
    author: {type: String, minlength: 5,maxlength:100, required: true},
    body:{type: String, minlength: 5,maxlength:100, required: true},
    createOn:{type: Date, "default": Date.now},
    like: {type: Number, "default": 0},
    deslike: {type: Number, "default": 0},
});


let postsSchema = new mongoose.Schema({

    title: {type: String, minlength: 5,maxlength:100, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true},
    rating: {type: Number, "default": 0, min: 0, max: 5},
    createOn: {type: Date, "default": Date.now}, 
    tags: [String],
    comments: [commentsSchema]
});


module.exports = mongoose.model('Posts', postsSchema);