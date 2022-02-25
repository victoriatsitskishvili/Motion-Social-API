const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/motionsocial', {
    //need to check whether your app successfully connect//
    useNewUrlParser: true,
    //removes support for several connection options that are no longer relevant//
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed //
mongoose.set('debug', true);

module.exports = mongoose.connection;
