const mongoose = require('mongoose');

//console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}, (err) => {
    if (!err) { console.log('succeessfull'); }
    else { console.log('Error in connection : ' + err); }
});

require('./user.model');
require('./employee.model');