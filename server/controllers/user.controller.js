
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');
const Emp = mongoose.model('Employee');

module.exports.register = (req, res, next) => {
    console.log(req.body);
    var user = new User();
    user.fullName = req.body.fullName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            // console.log(err.errors);
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        }
        else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        else {
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}

module.exports.employeeList = (req, res, next) =>{
    const page = parseInt(req.query.page);
    const limit = 15;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    result.next = {
        page : page + 1,
        limit : limit,       
    }

    result.prev = {
        page : page - 1,
        limit : limit,       
    }
     
    Emp.find({},
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'Users are record not found.' });
            }
            else{
                result.resultUser = user.slice(startIndex,endIndex);
                result.totalCounts = user.length;
                return res.status(200).json({ status: true, user : result});
            }
        }
    );
}