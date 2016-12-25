let mongoose = require('mongoose');

let dbPath = "mongodb://localhost/blog";

mongoose.connect(dbPath);

mongoose.connection.on('connected', function(){
    console.log('connected!');
});

mongoose.connection.on('error', function(error){
    console.log('error' + error);
});

mongoose.connection.on('disconnected', function(){
    console.log('disconnected database');
});


// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

module.exports = mongoose;