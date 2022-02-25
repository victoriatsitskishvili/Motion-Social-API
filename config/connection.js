const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/motionsocial', {
    // by default, you need to set it to false.
    useFindAndModify: false,
    //need to check whether your app successfully connect//
    useNewUrlParser: true,
    //removes support for several connection options that are no longer relevant//
    useUnifiedTopology: true,
    // Set to true to make default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings//
    useCreateIndex: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection;
